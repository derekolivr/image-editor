import * as fabric from 'fabric';
import { useEditorStore } from '@/store/editorStore';

// Helper function to apply filter to a specific region
// WARNING: This approach has limitations - filtered regions don't follow image transformations
// For now, we'll apply the filter to the whole image to avoid the "duplicate" issue
const applyFilterToRegion = (
    filterFn: (img: fabric.Image) => void,
    onComplete: () => void
) => {
    const { image, canvas, selection } = useEditorStore.getState();
    if (!image || !canvas || !selection) return;

    // SIMPLIFIED APPROACH: Apply filter to entire image for now
    // Region filtering with transforms is complex and causes visual issues
    // TODO: Implement proper pixel-level region filtering in the future

    filterFn(image);
    canvas.renderAll();
    onComplete();
};

export const applyBrightness = (value: number) => {
    const { image, canvas, selection, addToHistory, addPerformanceMetric } = useEditorStore.getState();
    if (!image || !canvas) return;

    const startTime = performance.now();

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Brightness({ brightness: value / 100 });
                img.filters = [filter];
                img.applyFilters();
            },
            () => {
                const endTime = performance.now();
                addPerformanceMetric(endTime - startTime, 'brightness');
                addToHistory();
            }
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Brightness({ brightness: value / 100 });
        image.filters![0] = filter;
        image.applyFilters();
        canvas.renderAll();
        const endTime = performance.now();
        addPerformanceMetric(endTime - startTime, 'brightness');
        addToHistory();
    }
};

export const applyContrast = (value: number) => {
    const { image, canvas, selection, addToHistory, addPerformanceMetric } = useEditorStore.getState();
    if (!image || !canvas) return;

    const startTime = performance.now();

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Contrast({ contrast: value / 100 });
                img.filters = [filter];
                img.applyFilters();
            },
            () => {
                const endTime = performance.now();
                addPerformanceMetric(endTime - startTime, 'contrast');
                addToHistory();
            }
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Contrast({ contrast: value / 100 });
        image.filters![1] = filter;
        image.applyFilters();
        canvas.renderAll();
        const endTime = performance.now();
        addPerformanceMetric(endTime - startTime, 'contrast');
        addToHistory();
    }
};

export const applyBlur = (value: number) => {
    const { image, canvas, selection, addToHistory, addPerformanceMetric } = useEditorStore.getState();
    if (!image || !canvas) return;

    const startTime = performance.now();

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Blur({ blur: value / 100 });
                img.filters = [filter];
                img.applyFilters();
            },
            () => {
                const endTime = performance.now();
                addPerformanceMetric(endTime - startTime, 'blur');
                addToHistory();
            }
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Blur({ blur: value / 100 });
        image.filters![2] = filter;
        image.applyFilters();
        canvas.renderAll();
        const endTime = performance.now();
        addPerformanceMetric(endTime - startTime, 'blur');
        addToHistory();
    }
};

export const applyGrayscale = () => {
    const { image, canvas, selection, addToHistory, addPerformanceMetric } = useEditorStore.getState();
    if (!image || !canvas) return;

    const startTime = performance.now();

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Grayscale();
                img.filters = [filter];
                img.applyFilters();
            },
            () => {
                const endTime = performance.now();
                addPerformanceMetric(endTime - startTime, 'grayscale');
                addToHistory();
            }
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Grayscale();
        image.filters![3] = filter;
        image.applyFilters();
        canvas.renderAll();
        const endTime = performance.now();
        addPerformanceMetric(endTime - startTime, 'grayscale');
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
    const { image, canvas, selection, addToHistory, addPerformanceMetric } = useEditorStore.getState();
    if (!image || !canvas) return;

    const startTime = performance.now();

    if (selection) {
        // Apply to selected region only
        applyFilterToRegion(
            (img) => {
                const filter = new fabric.filters.Sepia();
                img.filters = [filter];
                img.applyFilters();
            },
            () => {
                const endTime = performance.now();
                addPerformanceMetric(endTime - startTime, 'sepia');
                addToHistory();
            }
        );
    } else {
        // Apply to whole image
        const filter = new fabric.filters.Sepia();
        image.filters![4] = filter;
        image.applyFilters();
        canvas.renderAll();
        const endTime = performance.now();
        addPerformanceMetric(endTime - startTime, 'sepia');
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
