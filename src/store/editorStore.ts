import { create } from 'zustand';
import * as fabric from 'fabric';

type HistoryEntry = {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvasState: Record<string, any>; // Fabric canvas JSON
};

type PerformanceMetrics = {
    lastFilterTime: number | null;
    lastOperation: string | null;
    averageFilterTime: number;
    filterHistory: Array<{ duration: number; operation: string; timestamp: number }>;
    totalOperations: number;
    minFilterTime: number | null;
    maxFilterTime: number | null;
};

export interface EditorState {
    image: fabric.Image | null;
    canvas: fabric.Canvas | null;
    selection: fabric.Object | null;
    history: HistoryEntry[];
    historyIndex: number;
    isCropping: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    originalState: Record<string, any> | null;
    performanceMetrics: PerformanceMetrics;
    setCanvas: (canvas: fabric.Canvas | null) => void;
    setImage: (image: fabric.Image | null) => void;
    setIsCropping: (isCropping: boolean) => void;
    setSelection: (selection: fabric.Object | null) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setOriginalState: (state: Record<string, any> | null) => void;
    addToHistory: () => void;
    undo: () => void;
    redo: () => void;
    revertToOriginal: () => void;
    addPerformanceMetric: (duration: number, operation: string) => void;
}

const HISTORY_LIMIT = 20;
const PERF_HISTORY_LIMIT = 20;

export const useEditorStore = create<EditorState>((set, get) => ({
    image: null,
    canvas: null,
    selection: null,
    history: [],
    historyIndex: -1,
    isCropping: false,
    originalState: null,
    performanceMetrics: {
        lastFilterTime: null,
        lastOperation: null,
        averageFilterTime: 0,
        filterHistory: [],
        totalOperations: 0,
        minFilterTime: null,
        maxFilterTime: null,
    },
    setCanvas: (canvas) => set({ canvas }),
    setImage: (image) => set({ image }),
    setIsCropping: (isCropping) => set({ isCropping }),
    setSelection: (selection) => set({ selection }),
    setOriginalState: (state) => set({ originalState: state }),
    addToHistory: () => {
        const { canvas, history, historyIndex } = get();
        if (!canvas) return;

        const newHistory = history.slice(0, historyIndex + 1);
        const canvasState = canvas.toJSON();

        if (newHistory.length >= HISTORY_LIMIT) {
            newHistory.shift();
        }

        set({
            history: [
                ...newHistory,
                { id: Date.now().toString(), canvasState },
            ],
            historyIndex: newHistory.length,
        });
    },
    undo: () => {
        const { canvas, history, historyIndex } = get();
        if (!canvas || historyIndex <= 0) return;

        const newIndex = historyIndex - 1;
        const prevState = history[newIndex];

        // Clear the canvas first
        canvas.clear();

        // Restore canvas dimensions if they exist in the saved state
        if (prevState.canvasState.width && prevState.canvasState.height) {
            canvas.setWidth(prevState.canvasState.width);
            canvas.setHeight(prevState.canvasState.height);
        }

        // Load the previous state
        canvas.loadFromJSON(prevState.canvasState).then(() => {
            // Update the image reference in the store
            const objects = canvas.getObjects();
            const imageObj = objects.find((obj) => obj.type === 'image') as fabric.Image;

            canvas.renderAll();

            if (imageObj) {
                set({ image: imageObj, historyIndex: newIndex });
            } else {
                set({ historyIndex: newIndex });
            }
        });
    },
    redo: () => {
        const { canvas, history, historyIndex } = get();
        if (!canvas || historyIndex >= history.length - 1) return;

        const newIndex = historyIndex + 1;
        const nextState = history[newIndex];

        // Clear the canvas first
        canvas.clear();

        // Restore canvas dimensions if they exist in the saved state
        if (nextState.canvasState.width && nextState.canvasState.height) {
            canvas.setWidth(nextState.canvasState.width);
            canvas.setHeight(nextState.canvasState.height);
        }

        // Load the next state
        canvas.loadFromJSON(nextState.canvasState).then(() => {
            // Update the image reference in the store
            const objects = canvas.getObjects();
            const imageObj = objects.find((obj) => obj.type === 'image') as fabric.Image;

            canvas.renderAll();

            if (imageObj) {
                set({ image: imageObj, historyIndex: newIndex });
            } else {
                set({ historyIndex: newIndex });
            }
        });
    },
    revertToOriginal: () => {
        const { canvas, originalState } = get();
        if (!canvas || !originalState) return;

        // Save current state before reverting (so undo can restore it)
        const currentState = canvas.toJSON();

        // Clear the canvas
        canvas.clear();

        // Restore canvas dimensions from original state
        if (originalState.width && originalState.height) {
            canvas.setWidth(originalState.width);
            canvas.setHeight(originalState.height);
        }

        // Load the original state
        canvas.loadFromJSON(originalState).then(() => {
            // Update the image reference in the store
            const objects = canvas.getObjects();
            const imageObj = objects.find((obj) => obj.type === 'image') as fabric.Image;

            canvas.renderAll();

            if (imageObj) {
                set({ image: imageObj });
            }

            // Add the pre-revert state to history so undo will work
            const { history } = get();
            const newHistory = [...history, { id: Date.now().toString(), canvasState: currentState }];

            // Limit history size
            if (newHistory.length > HISTORY_LIMIT) {
                newHistory.shift();
            }

            set({
                history: newHistory,
                historyIndex: newHistory.length - 1,
            });
        });
    },
    addPerformanceMetric: (duration: number, operation: string) => {
        const { performanceMetrics } = get();
        const newEntry = { duration, operation, timestamp: Date.now() };

        // Add to history and limit size
        const newHistory = [...performanceMetrics.filterHistory, newEntry];
        if (newHistory.length > PERF_HISTORY_LIMIT) {
            newHistory.shift();
        }

        // Calculate statistics
        const totalOperations = performanceMetrics.totalOperations + 1;
        const sum = newHistory.reduce((acc, entry) => acc + entry.duration, 0);
        const averageFilterTime = sum / newHistory.length;
        const durations = newHistory.map(e => e.duration);
        const minFilterTime = Math.min(...durations);
        const maxFilterTime = Math.max(...durations);

        set({
            performanceMetrics: {
                lastFilterTime: duration,
                lastOperation: operation,
                averageFilterTime,
                filterHistory: newHistory,
                totalOperations,
                minFilterTime,
                maxFilterTime,
            },
        });
    },
}));
