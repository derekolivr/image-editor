import { useEditorStore } from "@/store/editorStore";
import { useEffect, useState } from "react";
import * as fabric from "fabric";
import { ToolbarButton } from "./ToolbarButton";
import { Paintbrush, XCircle } from "lucide-react";
import { ensureImageAtBack } from "@/utils/canvasHelpers";

export const BrushSelectionTool = () => {
  const { canvas, selection, setSelection } = useEditorStore();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvas) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePathCreated = (e: any) => {
      const path = e.path;
      if (!path) return;

      // Style the path as a selection
      path.set({
        fill: "rgba(59, 130, 246, 0.2)",
        stroke: "#3b82f6",
        strokeWidth: 2,
        strokeDashArray: [5, 5],
        selectable: true,
        hasControls: true,
        hasBorders: true,
        evented: true,
        data: { isSelection: true }, // Mark as selection object
      });

      // Ensure image stays at back
      ensureImageAtBack(canvas);

      // Set as the active selection
      canvas.setActiveObject(path);
      setSelection(path);
      canvas.renderAll();

      // Exit drawing mode
      setIsDrawing(false);
      canvas.isDrawingMode = false;
    };

    if (isDrawing) {
      canvas.on("path:created", handlePathCreated);
    }

    return () => {
      canvas.off("path:created", handlePathCreated);
    };
  }, [canvas, isDrawing, setSelection]);

  const startBrushSelection = () => {
    if (!canvas) return;

    // Clear any existing selection first
    if (selection) {
      canvas.remove(selection);
      setSelection(null);
    }

    // Enable drawing mode
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = "#3b82f6";

    setIsDrawing(true);
  };

  const cancelBrushSelection = () => {
    if (!canvas) return;

    canvas.isDrawingMode = false;
    setIsDrawing(false);
  };

  if (isDrawing) {
    return (
      <ToolbarButton onClick={cancelBrushSelection} label="Cancel" showLabel>
        <XCircle className="h-5 w-5 text-red-500" />
      </ToolbarButton>
    );
  }

  return (
    <ToolbarButton onClick={startBrushSelection} label="Brush" active={isDrawing} showLabel>
      <Paintbrush className="h-5 w-5" />
    </ToolbarButton>
  );
};
