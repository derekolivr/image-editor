import { useEditorStore } from "@/store/editorStore";
import * as fabric from "fabric";
import { ToolbarButton } from "./ToolbarButton";
import { Circle, Triangle, Square, Minus } from "lucide-react";
import { ensureImageAtBack } from "@/utils/canvasHelpers";

export const ShapesTool = () => {
  const { canvas, addToHistory } = useEditorStore();

  const addCircle = () => {
    if (!canvas) return;

    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: "rgba(59, 130, 246, 0.5)",
      stroke: "#3b82f6",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    canvas.add(circle);
    ensureImageAtBack(canvas);
    canvas.setActiveObject(circle);
    canvas.renderAll();
    addToHistory();
  };

  const addTriangle = () => {
    if (!canvas) return;

    const triangle = new fabric.Triangle({
      left: 150,
      top: 150,
      width: 100,
      height: 100,
      fill: "rgba(34, 197, 94, 0.5)",
      stroke: "#22c55e",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    canvas.add(triangle);
    ensureImageAtBack(canvas);
    canvas.setActiveObject(triangle);
    canvas.renderAll();
    addToHistory();
  };

  const addRectangle = () => {
    if (!canvas) return;

    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      width: 100,
      height: 80,
      fill: "rgba(251, 146, 60, 0.5)",
      stroke: "#fb923c",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    canvas.add(rect);
    ensureImageAtBack(canvas);
    canvas.setActiveObject(rect);
    canvas.renderAll();
    addToHistory();
  };

  const addLine = () => {
    if (!canvas) return;

    const line = new fabric.Line([50, 100, 200, 100], {
      left: 150,
      top: 150,
      stroke: "#ef4444",
      strokeWidth: 3,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    canvas.add(line);
    ensureImageAtBack(canvas);
    canvas.setActiveObject(line);
    canvas.renderAll();
    addToHistory();
  };

  return (
    <div className="flex items-center gap-1.5">
      <ToolbarButton onClick={addCircle} label="Circle" showLabel>
        <Circle className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={addTriangle} label="Triangle" showLabel>
        <Triangle className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={addRectangle} label="Square" showLabel>
        <Square className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={addLine} label="Line" showLabel>
        <Minus className="h-5 w-5" />
      </ToolbarButton>
    </div>
  );
};
