import { useEditorStore } from "@/store/editorStore";
import { getCropRectangle } from "@/utils/CropRectangle";
import * as fabric from "fabric";
import { ToolbarButton } from "./ToolbarButton";
import { Scissors, Check, X } from "lucide-react";

export const CropTool = () => {
  const { isCropping, setIsCropping, canvas, image, setImage, addToHistory } = useEditorStore();

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

  if (isCropping) {
    return (
      <div className="flex items-center gap-4">
        <ToolbarButton onClick={applyCrop} label="Apply Crop">
          <Check className="h-5 w-5 text-green-600" />
        </ToolbarButton>
        <ToolbarButton onClick={cancelCrop} label="Cancel Crop">
          <X className="h-5 w-5 text-red-600" />
        </ToolbarButton>
      </div>
    );
  }

  return (
    <ToolbarButton onClick={() => setIsCropping(true)} label="Crop">
      <Scissors className="h-5 w-5" />
    </ToolbarButton>
  );
};
