import * as fabric from 'fabric';
import { useEditorStore } from '@/store/editorStore';

export const applyBrightness = (value: number) => {
    const { image, canvas, addToHistory } = useEditorStore.getState();
    if (image && canvas) {
        const filter = new fabric.filters.Brightness({
            brightness: value / 100,
        });
        image.filters![0] = filter;
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

export const applyContrast = (value: number) => {
    const { image, canvas, addToHistory } = useEditorStore.getState();
    if (image && canvas) {
        const filter = new fabric.filters.Contrast({
            contrast: value / 100,
        });
        image.filters![1] = filter;
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

export const applyBlur = (value: number) => {
    const { image, canvas, selection, addToHistory } = useEditorStore.getState();
    if (!image || !canvas) return;

    const blurValue = value / 100;

    if (selection) {
        // Simplified masked blur: clone, filter, and clip.
        image.clone((cloned: fabric.Image) => {
            cloned.filters = [new fabric.filters.Blur({ blur: blurValue })];
            cloned.applyFilters();

            cloned.clipPath = selection;

            canvas.add(cloned);
            addToHistory();
        });
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Blur({ blur: blurValue });
        image.filters![2] = filter;
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

// Initialize filters array on the image object
export const initializeFilters = () => {
    const { image } = useEditorStore.getState();
    if (image && !image.filters) {
        image.filters = [];
    }
};
