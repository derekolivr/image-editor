import { useEditorStore } from "@/store/editorStore";
import { ToolbarButton } from "./ToolbarButton";
import { RotateCcw, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";

export const RotateTool = () => {
  const { canvas, image, addToHistory } = useEditorStore();

  const rotate = (angle: number) => {
    if (image && canvas) {
      const newAngle = (image.angle || 0) + angle;
      image.rotate(newAngle);
      canvas.renderAll();
      addToHistory();
    }
  };

  const flip = (axis: "x" | "y") => {
    if (image && canvas) {
      if (axis === "x") {
        image.flipX = !image.flipX;
      } else {
        image.flipY = !image.flipY;
      }
      canvas.renderAll();
      addToHistory();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <ToolbarButton onClick={() => rotate(-90)} label="Rotate Left">
        <RotateCcw className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => rotate(90)} label="Rotate Right">
        <RotateCw className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => flip("x")} label="Flip Horizontal">
        <FlipHorizontal className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => flip("y")} label="Flip Vertical">
        <FlipVertical className="h-5 w-5" />
      </ToolbarButton>
    </div>
  );
};
