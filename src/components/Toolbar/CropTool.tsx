import { useEditorStore } from "@/store/editorStore";
import { getCropRectangle } from "@/utils/CropRectangle";
import fabric from "fabric";

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
      <button onClick={handleCrop} className="bg-secondary text-secondary-foreground p-2 rounded">
        {isCropping ? "Exit Crop Mode" : "Crop"}
      </button>
      {isCropping && (
        <>
          <button onClick={applyCrop} className="bg-primary text-primary-foreground p-2 rounded">
            Apply
          </button>
          <button onClick={cancelCrop} className="bg-destructive text-destructive-foreground p-2 rounded">
            Cancel
          </button>
        </>
      )}
    </div>
  );
};
