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

