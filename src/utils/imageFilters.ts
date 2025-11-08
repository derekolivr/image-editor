import * as fabric from 'fabric';
import { useEditorStore } from '@/store/editorStore';

// Helper function to apply filter to a specific region
const applyFilterToRegion = (
    filterFn: (img: fabric.Image) => void,
    onComplete: () => void
) => {
    const { image, canvas, selection } = useEditorStore.getState();
    if (!image || !canvas || !selection) return;

    // Clone the image
    image.clone().then((cloned: fabric.Image) => {
        // Apply the filter to the cloned image
        filterFn(cloned);

        // Clone the selection rectangle to use as clip path
        selection.clone().then((clipRect: fabric.Object) => {
            // Make the clip path absolute (relative to the canvas, not the image)
            clipRect.set({
                absolutePositioned: true,
            });

            // Set the cloned rectangle as the clip path
            cloned.clipPath = clipRect;

            // Position the cloned image exactly where the original is
            cloned.set({
                left: image.left,
                top: image.top,
                scaleX: image.scaleX,
                scaleY: image.scaleY,
                angle: image.angle,
            });

            // Lock the filtered layer so it can't be moved
            cloned.set({
                selectable: false,
                evented: false,
            });

            // Add the filtered, clipped image on top
            canvas.add(cloned);
            canvas.renderAll();
            onComplete();
        });
    });
};

export const applyBrightness = (value: number) => {
    const { image, canvas, selection, addToHistory } = useEditorStore.getState();
    if (!image || !canvas) return;

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Brightness({ brightness: value / 100 });
                img.filters = [filter];
                img.applyFilters();
            },
            () => addToHistory()
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Brightness({ brightness: value / 100 });
        image.filters![0] = filter;
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

export const applyContrast = (value: number) => {
    const { image, canvas, selection, addToHistory } = useEditorStore.getState();
    if (!image || !canvas) return;

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Contrast({ contrast: value / 100 });
                img.filters = [filter];
                img.applyFilters();
            },
            () => addToHistory()
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Contrast({ contrast: value / 100 });
        image.filters![1] = filter;
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

export const applyBlur = (value: number) => {
    const { image, canvas, selection, addToHistory } = useEditorStore.getState();
    if (!image || !canvas) return;

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Blur({ blur: value / 100 });
                img.filters = [filter];
                img.applyFilters();
            },
            () => addToHistory()
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Blur({ blur: value / 100 });
        image.filters![2] = filter;
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

export const applyGrayscale = () => {
    const { image, canvas, selection, addToHistory } = useEditorStore.getState();
    if (!image || !canvas) return;

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Grayscale();
                img.filters = [filter];
                img.applyFilters();
            },
            () => addToHistory()
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Grayscale();
        image.filters![3] = filter;
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

export const removeGrayscale = () => {
    const { image, canvas, addToHistory } = useEditorStore.getState();
    if (image && canvas) {
        // Remove the filter by filtering out the grayscale filter
        image.filters = image.filters?.filter((_, index) => index !== 3) || [];
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

export const applySepia = () => {
    const { image, canvas, selection, addToHistory } = useEditorStore.getState();
    if (!image || !canvas) return;

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Sepia();
                img.filters = [filter];
                img.applyFilters();
            },
            () => addToHistory()
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Sepia();
        image.filters![4] = filter;
        image.applyFilters();
        canvas.renderAll();
        addToHistory();
    }
};

export const removeSepia = () => {
    const { image, canvas, addToHistory } = useEditorStore.getState();
    if (image && canvas) {
        // Remove the filter by filtering out the sepia filter
        image.filters = image.filters?.filter((_, index) => index !== 4) || [];
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
