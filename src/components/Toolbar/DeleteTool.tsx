import { useEditorStore } from "@/store/editorStore";
import { useEffect, useState } from "react";
import { ToolbarButton } from "./ToolbarButton";
import { Trash2 } from "lucide-react";

export const DeleteTool = () => {
  const { canvas, addToHistory } = useEditorStore();
  const [hasActiveObject, setHasActiveObject] = useState(false);

  useEffect(() => {
    if (!canvas) return;

    const updateActiveState = () => {
      const activeObject = canvas.getActiveObject();
      // Only allow deletion of non-image objects (shapes, text, selections, paths)
      const canDelete = activeObject && activeObject.type !== "image";
      setHasActiveObject(!!canDelete);
    };

    // Update state when selection changes
    canvas.on("selection:created", updateActiveState);
    canvas.on("selection:updated", updateActiveState);
    canvas.on("selection:cleared", updateActiveState);

    // Initial check
    updateActiveState();

    return () => {
      canvas.off("selection:created", updateActiveState);
      canvas.off("selection:updated", updateActiveState);
      canvas.off("selection:cleared", updateActiveState);
    };
  }, [canvas]);

  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete on Backspace, Delete, or Escape
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "Escape") {
        const activeObject = canvas.getActiveObject();

        // Don't delete the main image
        if (activeObject && activeObject.type !== "image") {
          e.preventDefault(); // Prevent browser back navigation on Backspace
          canvas.remove(activeObject);
          canvas.discardActiveObject();
          canvas.renderAll();
          addToHistory();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas, addToHistory]);

  const handleDelete = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type !== "image") {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.renderAll();
      addToHistory();
    }
  };

  return (
    <ToolbarButton onClick={handleDelete} disabled={!hasActiveObject} label="Delete" showLabel>
      <Trash2 className="h-5 w-5" />
    </ToolbarButton>
  );
};
