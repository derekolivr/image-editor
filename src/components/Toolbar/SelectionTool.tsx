import { useEditorStore } from "@/store/editorStore";
import * as fabric from "fabric";
import { ToolbarButton } from "./ToolbarButton";
import { Square, XCircle } from "lucide-react";

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
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    setSelection(rect);
    canvas.renderAll();
  };

  const clearSelection = () => {
    if (!canvas || !selection) return;

    canvas.remove(selection);
    setSelection(null);
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  return (
    <div className="flex items-center gap-4">
      <ToolbarButton onClick={createSelection} label="Create Selection">
        <Square className="h-5 w-5" />
      </ToolbarButton>
      {selection && (
        <ToolbarButton onClick={clearSelection} label="Clear Selection">
          <XCircle className="h-5 w-5" />
        </ToolbarButton>
      )}
    </div>
  );
};
