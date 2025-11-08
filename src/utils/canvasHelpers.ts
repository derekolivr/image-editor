import * as fabric from 'fabric';

/**
 * Ensures the main image always stays at the bottom of the z-order
 * Call this after adding any new objects to the canvas
 */
export const ensureImageAtBack = (canvas: fabric.Canvas) => {
    const objects = canvas.getObjects();
    const imageObj = objects.find((obj) => obj.type === 'image');

    if (imageObj) {
        canvas.sendObjectToBack(imageObj);
    }
};

/**
 * Locks the image object to prevent it from being moved, scaled, or rotated
 * This should be called after loading canvas state from JSON (undo/redo/revert)
 */
export const lockImageObject = (imageObj: fabric.Image) => {
    imageObj.set({
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
};

/**
 * Restores the canvas state after loading from JSON (used in undo/redo/revert)
 * This ensures the image is locked and at the back, maintaining proper state
 * Also handles filtered image clones (from region selection)
 */
export const restoreCanvasState = (canvas: fabric.Canvas): fabric.Image | null => {
    const objects = canvas.getObjects();

    // Find the main image (first image in the objects array)
    const imageObjects = objects.filter((obj) => obj.type === 'image') as fabric.Image[];

    if (imageObjects.length === 0) {
        canvas.renderAll();
        return null;
    }

    // The first image is the main image, others are filtered clones
    const mainImage = imageObjects[0];
    const filteredClones = imageObjects.slice(1);

    // Lock the main image to prevent interaction
    lockImageObject(mainImage);

    // Lock all filtered clones (from region filtering) to prevent interaction
    filteredClones.forEach((clone) => {
        clone.set({
            selectable: false,
            evented: false,
        });
    });

    // Ensure main image is at the back (filtered clones should be on top)
    ensureImageAtBack(canvas);

    canvas.renderAll();
    return mainImage;
};

