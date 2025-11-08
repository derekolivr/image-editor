import { useEditorStore } from "@/store/editorStore";
import * as fabric from "fabric";
import type { ChangeEvent } from "react";
import { initializeFilters } from "@/utils/imageFilters";
import { centerImageOnCanvas } from "@/utils/canvasHelpers";
import { Upload } from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";

export const ImageUploader = () => {
  const { canvas, setImage, addToHistory, setOriginalState, setOrientation, setOriginalImageDimensions } =
    useEditorStore();

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

          // Store original image dimensions
          setOriginalImageDimensions({ width: imgObj.width, height: imgObj.height });

          // Determine initial orientation
          const initialOrientation = imgObj.width >= imgObj.height ? "horizontal" : "vertical";
          setOrientation(initialOrientation);

          // Center the image on the fixed canvas
          centerImageOnCanvas(canvas, image);

          setImage(image);
          initializeFilters(); // Initialize filters for the new image

          // Save the original state for revert functionality
          const originalCanvasState = canvas.toJSON();
          // Explicitly save canvas dimensions
          originalCanvasState.width = canvas.getWidth();
          originalCanvasState.height = canvas.getHeight();
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
        <ToolbarButton as="div" label="Upload" showLabel>
          <Upload className="h-5 w-5" />
        </ToolbarButton>
      </label>
    </div>
  );
};
