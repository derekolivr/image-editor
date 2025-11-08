import { useEditorStore } from "@/store/editorStore";
import * as fabric from "fabric";
import { ToolbarButton } from "./ToolbarButton";
import { Type } from "lucide-react";
import { ensureImageAtBack } from "@/utils/canvasHelpers";

export const TextTool = () => {
  const { canvas, addToHistory } = useEditorStore();

  const addText = () => {
    if (!canvas) return;

    const text = new fabric.IText("Double-click to edit", {
      left: 150,
      top: 150,
      fontFamily: "Arial",
      fontSize: 24,
      fill: "#000000",
      selectable: true,
      hasControls: true,
      hasBorders: true,
      editable: true,
    });

    canvas.add(text);
    ensureImageAtBack(canvas);
    canvas.setActiveObject(text);
    canvas.renderAll();
    addToHistory();

    // Enter edit mode immediately
    text.enterEditing();
    text.selectAll();
  };

  return (
    <ToolbarButton onClick={addText} label="Text" showLabel>
      <Type className="h-5 w-5" />
    </ToolbarButton>
  );
};
