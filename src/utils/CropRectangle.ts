import fabric from 'fabric';

let cropRect: fabric.Rect | null = null;

export const addCropRectangle = (canvas: fabric.Canvas) => {
    if (cropRect) {
        canvas.remove(cropRect);
    }

    const image = canvas.getObjects('image')[0] as fabric.Image;
    if (!image) return;

    cropRect = new fabric.Rect({
        left: image.left,
        top: image.top,
        width: image.getScaledWidth() / 2,
        height: image.getScaledHeight() / 2,
        fill: 'rgba(0,0,0,0.3)',
        stroke: '#ccc',
        strokeDashArray: [4, 4],
        cornerColor: '#f0f0f0',
        cornerSize: 10,
        transparentCorners: false,
        cornerStyle: 'circle',
    });

    cropRect.setControlsVisibility({
        mtr: false, // hide rotation control
    });

    canvas.add(cropRect);
    canvas.setActiveObject(cropRect);
    canvas.renderAll();
};

export const removeCropRectangle = (canvas: fabric.Canvas) => {
    if (cropRect) {
        canvas.remove(cropRect);
        cropRect = null;
        canvas.renderAll();
    }
};

export const getCropRectangle = () => {
    return cropRect;
};
