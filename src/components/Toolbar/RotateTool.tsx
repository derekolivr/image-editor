import { useEditorStore } from "@/store/editorStore";
import { ToolbarButton } from "./ToolbarButton";
import { RotateCcw, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";
import { centerImageOnCanvas } from "@/utils/canvasHelpers";

export const RotateTool = () => {
  const { canvas, image, addToHistory, orientation, setOrientation, originalImageDimensions } = useEditorStore();

  const rotate = (angle: number) => {
    if (image && canvas && originalImageDimensions) {
      const newAngle = (image.angle || 0) + angle;
      image.rotate(newAngle);

      // Toggle orientation on 90° or 270° rotations
      const newOrientation = orientation === "horizontal" ? "vertical" : "horizontal";
      setOrientation(newOrientation);

      // Re-center the image (canvas size stays the same)
      centerImageOnCanvas(canvas, image);

      addToHistory();
    }
  };

  const flip = (axis: "x" | "y") => {
    if (image && canvas && originalImageDimensions) {
      if (axis === "x") {
        image.flipX = !image.flipX;
      } else {
        image.flipY = !image.flipY;
      }

      // Re-center the image (canvas size stays the same)
      centerImageOnCanvas(canvas, image);

      addToHistory();
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <ToolbarButton onClick={() => rotate(-90)} label="Left" showLabel>
        <RotateCcw className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => rotate(90)} label="Right" showLabel>
        <RotateCw className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => flip("x")} label="Flip H" showLabel>
        <FlipHorizontal className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => flip("y")} label="Flip V" showLabel>
        <FlipVertical className="h-5 w-5" />
      </ToolbarButton>
    </div>
  );
};
