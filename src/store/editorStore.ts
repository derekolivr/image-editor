import { create } from 'zustand';
import fabric from 'fabric';

// Note: A real HistoryEntry would be more complex.
// This is a placeholder for now.
type HistoryEntry = {
    id: string;
    canvasState: any; // Fabric canvas JSON
};

export interface EditorState {
    image: fabric.Image | null;
    canvas: fabric.Canvas | null;
    selection: fabric.Object | null;
    history: HistoryEntry[];
    historyIndex: number;
    isCropping: boolean;
    setCanvas: (canvas: fabric.Canvas | null) => void;
    setImage: (image: fabric.Image | null) => void;
    setIsCropping: (isCropping: boolean) => void;
    setSelection: (selection: fabric.Object | null) => void;
    addToHistory: () => void;
    undo: () => void;
    redo: () => void;
}

const HISTORY_LIMIT = 20;

export const useEditorStore = create<EditorState>((set, get) => ({
    image: null,
    canvas: null,
    selection: null,
    history: [],
    historyIndex: -1,
    isCropping: false,
    setCanvas: (canvas) => set({ canvas }),
    setImage: (image) => set({ image }),
    setIsCropping: (isCropping) => set({ isCropping }),
    setSelection: (selection) => set({ selection }),
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
        canvas.loadFromJSON(prevState.canvasState, () => {
            canvas.renderAll();
            set({ historyIndex: newIndex });
        });
    },
    redo: () => {
        const { canvas, history, historyIndex } = get();
        if (!canvas || historyIndex >= history.length - 1) return;

        const newIndex = historyIndex + 1;
        const nextState = history[newIndex];
        canvas.loadFromJSON(nextState.canvasState, () => {
            canvas.renderAll();
            set({ historyIndex: newIndex });
        });
    },
}));
