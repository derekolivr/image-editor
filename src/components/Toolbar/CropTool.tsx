import { useEditorStore } from "@/store/editorStore";
import { getCropRectangle } from "@/utils/CropRectangle";
import * as fabric from "fabric";

export const CropTool = () => {
  const { isCropping, setIsCropping, canvas, image, setImage, addToHistory } = useEditorStore();

  const handleCrop = () => {
    setIsCropping(!isCropping);
  };

  const applyCrop = () => {
    const cropRect = getCropRectangle();
    if (cropRect && image && canvas) {
      const cropped = new Image();
      cropped.src = image.toDataURL({
        left: cropRect.left,
        top: cropRect.top,
        width: cropRect.getScaledWidth(),
        height: cropRect.getScaledHeight(),
      });

      cropped.onload = () => {
        canvas.clear();
        const newImage = new fabric.Image(cropped);
        canvas.setWidth(cropped.width);
        canvas.setHeight(cropped.height);
        canvas.add(newImage);
        canvas.centerObject(newImage);
        newImage.scaleToWidth(canvas.getWidth());
        setImage(newImage);
        addToHistory();
      };
    }
    setIsCropping(false);
  };

  const cancelCrop = () => {
    setIsCropping(false);
  };

  return (
    <div className="flex gap-2">
      <button onClick={handleCrop} className="p-2 rounded bg-gray-200 hover:bg-gray-300">
        {isCropping ? "Exit Crop Mode" : "Crop"}
      </button>
      {isCropping && (
        <>
          <button onClick={applyCrop} className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Apply
          </button>
          <button onClick={cancelCrop} className="p-2 rounded bg-red-600 text-white hover:bg-red-700">
            Cancel
          </button>
        </>
      )}
    </div>
  );
};
