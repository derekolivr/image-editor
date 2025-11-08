import { useEditorStore } from "@/store/editorStore";
import * as fabric from "fabric";
import type { ChangeEvent } from "react";
import { initializeFilters } from "@/utils/imageFilters";
import { Upload } from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";

export const ImageUploader = () => {
  const { canvas, setImage, addToHistory, setOriginalState } = useEditorStore();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgObj = new Image();
        imgObj.src = event.target?.result as string;
        imgObj.onload = () => {
          // Clear the canvas before adding a new image
          canvas.clear();

          const image = new fabric.Image(imgObj);
          canvas.setWidth(imgObj.width);
          canvas.setHeight(imgObj.height);

          // Lock the image in place - prevent moving, scaling, rotating via canvas
          image.set({
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

          canvas.add(image);
          canvas.centerObject(image);
          image.scaleToWidth(canvas.getWidth());
          setImage(image);
          initializeFilters(); // Initialize filters for the new image
          canvas.renderAll();

          // Save the original state for revert functionality
          const originalCanvasState = canvas.toJSON();
          setOriginalState(originalCanvasState);

          // Add the initial state to history
          addToHistory();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
      <label htmlFor="image-upload" className="cursor-pointer">
        <ToolbarButton as="div" label="Upload Image">
          <Upload className="h-5 w-5" />
        </ToolbarButton>
      </label>
    </div>
  );
};
