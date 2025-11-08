import * as fabric from 'fabric';
import { useEditorStore } from '@/store/editorStore';

/**
 * Apply filter to a region using mask-based pixel manipulation
 * This is NON-DESTRUCTIVE - always works from the original image
 */
const applyFilterToRegion = (
    filterFn: (img: fabric.Image) => void,
    onComplete: () => void
) => {
    const { canvas, selection, originalState } = useEditorStore.getState();
    if (!canvas || !selection || !originalState) return;

    // Get the original image element
    const originalImgSrc = originalState.objects?.[0]?.src;
    if (!originalImgSrc) return;

    const originalImg = new Image();
    originalImg.onload = () => {
        // Get current image to preserve transform properties
        const currentImage = canvas.getObjects().find(obj => obj.type === 'image') as fabric.Image;
        if (!currentImage) return;

        // Create canvas for the full filtered image
        const filteredCanvas = document.createElement('canvas');
        filteredCanvas.width = originalImg.width;
        filteredCanvas.height = originalImg.height;
        const filteredCtx = filteredCanvas.getContext('2d');
        if (!filteredCtx) return;

        // Draw original to temp canvas and apply filter
        filteredCtx.drawImage(originalImg, 0, 0);
        const tempFabricImg = new fabric.Image(filteredCanvas);
        filterFn(tempFabricImg);
        tempFabricImg.applyFilters();
        const fullyFilteredCanvas = tempFabricImg.toCanvasElement();

        // Create final result canvas
        const resultCanvas = document.createElement('canvas');
        resultCanvas.width = originalImg.width;
        resultCanvas.height = originalImg.height;
        const resultCtx = resultCanvas.getContext('2d');
        if (!resultCtx) return;

        // Draw original image as base
        resultCtx.drawImage(originalImg, 0, 0);

        // Create a mask from the selection shape
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = originalImg.width;
        maskCanvas.height = originalImg.height;
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return;

        // Transform mask context to match selection position relative to image
        maskCtx.save();

        // Clone and render the selection shape to create mask
        selection.clone().then(() => {

            // Create a temp canvas for the selection shape
            const selCanvas = document.createElement('canvas');
            selCanvas.width = originalImg.width;
            selCanvas.height = originalImg.height;
            const selCtx = selCanvas.getContext('2d');
            if (!selCtx) return;

            // Render the selection shape as a mask using Fabric.js
            // This properly handles all shape types and transforms

            // Create a temporary Fabric canvas for rendering the mask
            const tempMaskCanvas = new fabric.StaticCanvas(document.createElement('canvas'), {
                width: originalImg.width,
                height: originalImg.height,
            });

            // Clone the selection and adjust its position/scale for the original image coordinates
            selection.clone().then((clonedSel: fabric.Object) => {
                // Use Fabric's vector math for a more robust transformation
                const imageCenter = currentImage.getCenterPoint();
                const selectionCenter = selection.getCenterPoint();

                // 1. Get vector from image center to selection center in canvas space
                const vec = selectionCenter.subtract(imageCenter);

                // 2. Apply inverse transformations to the vector
                // Inverse scale
                vec.x /= currentImage.scaleX || 1;
                vec.y /= currentImage.scaleY || 1;

                // Inverse rotate
                const angleRad = -(currentImage.angle || 0) * (Math.PI / 180);
                const rotatedVec = vec.rotate(angleRad);

                // Inverse flip
                if (currentImage.flipX) rotatedVec.x *= -1;
                if (currentImage.flipY) rotatedVec.y *= -1;

                // 3. `rotatedVec` is now the center of selection in the image's local coordinate system (where 0,0 is the center)
                //    Convert this to top-left coordinates for our temporary mask canvas.
                const finalLeft = rotatedVec.x + originalImg.width / 2;
                const finalTop = rotatedVec.y + originalImg.height / 2;

                // Set white fill for mask (remove stroke)
                clonedSel.set({
                    left: finalLeft,
                    top: finalTop,
                    originX: 'center', // IMPORTANT: Use center origin for positioning
                    originY: 'center',
                    scaleX: (selection.scaleX || 1) / (currentImage.scaleX || 1),
                    scaleY: (selection.scaleY || 1) / (currentImage.scaleY || 1),
                    angle: (selection.angle || 0) - (currentImage.angle || 0),
                    fill: 'white',
                    stroke: undefined,
                    strokeWidth: 0,
                });

                tempMaskCanvas.add(clonedSel);
                tempMaskCanvas.renderAll();

                // Get the rendered mask
                const maskCanvasEl = tempMaskCanvas.getElement();
                selCtx.drawImage(maskCanvasEl, 0, 0);

                processWithMask();
            });

            const processWithMask = () => {
                // Use the selection shape as a mask
                const selImageData = selCtx.getImageData(0, 0, originalImg.width, originalImg.height);
                const originalImageData = resultCtx.getImageData(0, 0, originalImg.width, originalImg.height);
                const filteredImageData = resultCtx.createImageData(originalImg.width, originalImg.height);

                // Copy filtered canvas to image data
                const tempCtx = document.createElement('canvas').getContext('2d')!;
                tempCtx.canvas.width = originalImg.width;
                tempCtx.canvas.height = originalImg.height;
                tempCtx.drawImage(fullyFilteredCanvas, 0, 0);
                const filteredData = tempCtx.getImageData(0, 0, originalImg.width, originalImg.height);

                // Blend: use filtered pixels where mask is white, original pixels elsewhere
                for (let i = 0; i < selImageData.data.length; i += 4) {
                    const maskAlpha = selImageData.data[i] / 255; // Use red channel as mask

                    if (maskAlpha > 0) {
                        // Use filtered pixel
                        filteredImageData.data[i] = filteredData.data[i];
                        filteredImageData.data[i + 1] = filteredData.data[i + 1];
                        filteredImageData.data[i + 2] = filteredData.data[i + 2];
                        filteredImageData.data[i + 3] = filteredData.data[i + 3];
                    } else {
                        // Use original pixel
                        filteredImageData.data[i] = originalImageData.data[i];
                        filteredImageData.data[i + 1] = originalImageData.data[i + 1];
                        filteredImageData.data[i + 2] = originalImageData.data[i + 2];
                        filteredImageData.data[i + 3] = originalImageData.data[i + 3];
                    }
                }

                // Put the blended result
                resultCtx.putImageData(filteredImageData, 0, 0);

                // Create the final fabric image
                const finalImg = new Image();
                finalImg.onload = () => {
                    const newFabricImg = new fabric.Image(finalImg);

                    // Preserve all properties including transforms
                    newFabricImg.set({
                        left: currentImage.left,
                        top: currentImage.top,
                        scaleX: currentImage.scaleX,
                        scaleY: currentImage.scaleY,
                        angle: currentImage.angle,
                        flipX: currentImage.flipX,
                        flipY: currentImage.flipY,
                        selectable: false,
                        evented: false,
                        hasControls: false,
                        hasBorders: false,
                        lockMovementX: true,
                        lockMovementY: true,
                        lockRotation: true,
                        lockScalingX: true,
                        lockScalingY: true,
                    });

                    canvas.remove(currentImage);
                    canvas.add(newFabricImg);
                    canvas.renderAll();

                    const { setImage } = useEditorStore.getState();
                    setImage(newFabricImg);

                    onComplete();
                };
                finalImg.src = resultCanvas.toDataURL();
            };
        });
    };
    originalImg.src = originalImgSrc;
};

/**
 * Apply filter to the entire image (non-destructively)
 * Works from the original image to prevent data loss
 */
const applyFilterToWholeImage = (
    filterFn: (img: fabric.Image) => void,
    onComplete: () => void
) => {
    const { canvas, originalState } = useEditorStore.getState();
    if (!canvas || !originalState) return;

    // Get the original image source
    const originalImgSrc = originalState.objects?.[0]?.src;
    if (!originalImgSrc) return;

    const originalImg = new Image();
    originalImg.onload = () => {
        // Get current image to preserve transform properties
        const currentImage = canvas.getObjects().find(obj => obj.type === 'image') as fabric.Image;
        if (!currentImage) return;

        // Create a fabric image from original
        const tempFabricImg = new fabric.Image(originalImg);

        // Apply the filter
        filterFn(tempFabricImg);
        tempFabricImg.applyFilters();

        // Get the filtered result
        const filteredCanvas = tempFabricImg.toCanvasElement();

        // Create final image
        const finalImg = new Image();
        finalImg.onload = () => {
            const newFabricImg = new fabric.Image(finalImg);

            // Preserve all transform properties
            newFabricImg.set({
                left: currentImage.left,
                top: currentImage.top,
                scaleX: currentImage.scaleX,
                scaleY: currentImage.scaleY,
                angle: currentImage.angle,
                selectable: false,
                evented: false,
                hasControls: false,
                hasBorders: false,
                lockMovementX: true,
                lockMovementY: true,
                lockRotation: true,
                lockScalingX: true,
                lockScalingY: true,
            });

            canvas.remove(currentImage);
            canvas.add(newFabricImg);
            canvas.renderAll();

            const { setImage } = useEditorStore.getState();
            setImage(newFabricImg);

            onComplete();
        };
        finalImg.src = filteredCanvas.toDataURL();
    };
    originalImg.src = originalImgSrc;
};

export const applyBrightness = (value: number) => {
    const { selection, addPerformanceMetric } = useEditorStore.getState();

    const startTime = performance.now();

    const filterFn = (img: fabric.Image) => {
        const filter = new fabric.filters.Brightness({ brightness: value / 100 });
        img.filters = [filter];
        img.applyFilters();
    };

    const onComplete = () => {
        const endTime = performance.now();
        const { addToHistory } = useEditorStore.getState();
        addPerformanceMetric(endTime - startTime, 'brightness');
        addToHistory();
    };

    if (selection) {
        applyFilterToRegion(filterFn, onComplete);
    } else {
        applyFilterToWholeImage(filterFn, onComplete);
    }
};

export const applyContrast = (value: number) => {
    const { selection, addPerformanceMetric } = useEditorStore.getState();

    const startTime = performance.now();

    const filterFn = (img: fabric.Image) => {
        const filter = new fabric.filters.Contrast({ contrast: value / 100 });
        img.filters = [filter];
        img.applyFilters();
    };

    const onComplete = () => {
        const endTime = performance.now();
        const { addToHistory } = useEditorStore.getState();
        addPerformanceMetric(endTime - startTime, 'contrast');
        addToHistory();
    };

    if (selection) {
        applyFilterToRegion(filterFn, onComplete);
    } else {
        applyFilterToWholeImage(filterFn, onComplete);
    }
};

export const applyBlur = (value: number) => {
    const { selection, addPerformanceMetric } = useEditorStore.getState();

    const startTime = performance.now();

    const filterFn = (img: fabric.Image) => {
        const filter = new fabric.filters.Blur({ blur: value / 100 });
        img.filters = [filter];
        img.applyFilters();
    };

    const onComplete = () => {
        const endTime = performance.now();
        const { addToHistory } = useEditorStore.getState();
        addPerformanceMetric(endTime - startTime, 'blur');
        addToHistory();
    };

    if (selection) {
        applyFilterToRegion(filterFn, onComplete);
    } else {
        applyFilterToWholeImage(filterFn, onComplete);
    }
};

export const applyGrayscale = () => {
    const { selection, addPerformanceMetric } = useEditorStore.getState();

    const startTime = performance.now();

    const filterFn = (img: fabric.Image) => {
        const filter = new fabric.filters.Grayscale();
        img.filters = [filter];
        img.applyFilters();
    };

    const onComplete = () => {
        const endTime = performance.now();
        const { addToHistory } = useEditorStore.getState();
        addPerformanceMetric(endTime - startTime, 'grayscale');
        addToHistory();
    };

    if (selection) {
        applyFilterToRegion(filterFn, onComplete);
    } else {
        applyFilterToWholeImage(filterFn, onComplete);
    }
};

export const removeGrayscale = () => {
    // Removing a filter = reverting to original, which is handled by revert button
    // For now, just apply a "no filter" which is the same as revert
    const { revertToOriginal } = useEditorStore.getState();
    revertToOriginal();
};

export const applySepia = () => {
    const { selection, addPerformanceMetric } = useEditorStore.getState();

    const startTime = performance.now();

    const filterFn = (img: fabric.Image) => {
        const filter = new fabric.filters.Sepia();
        img.filters = [filter];
        img.applyFilters();
    };

    const onComplete = () => {
        const endTime = performance.now();
        const { addToHistory } = useEditorStore.getState();
        addPerformanceMetric(endTime - startTime, 'sepia');
        addToHistory();
    };

    if (selection) {
        applyFilterToRegion(filterFn, onComplete);
    } else {
        applyFilterToWholeImage(filterFn, onComplete);
    }
};

export const removeSepia = () => {
    // Removing a filter = reverting to original
    const { revertToOriginal } = useEditorStore.getState();
    revertToOriginal();
};

// Initialize filters array on the image object
export const initializeFilters = () => {
    const { image } = useEditorStore.getState();
    if (image && !image.filters) {
        image.filters = [];
    }
};
