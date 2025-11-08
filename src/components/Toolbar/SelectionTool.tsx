import { useEditorStore } from "@/store/editorStore";
import * as fabric from "fabric";
import { ToolbarButton } from "./ToolbarButton";
import { Square } from "lucide-react";

export const SelectionTool = () => {
  const { canvas, selection, setSelection } = useEditorStore();

  const createSelection = () => {
    if (!canvas) return;

    // Clear any existing selection first
    if (selection) {
      canvas.remove(selection);
    }

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      fill: "rgba(59, 130, 246, 0.2)",
      stroke: "#3b82f6",
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: true,
      hasControls: true,
      hasBorders: true,
      data: { isSelection: true }, // Mark as selection object
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    setSelection(rect);
    canvas.renderAll();
  };

  return (
    <ToolbarButton onClick={createSelection} label="Rectangle" showLabel>
      <Square className="h-5 w-5" />
    </ToolbarButton>
  );
};
