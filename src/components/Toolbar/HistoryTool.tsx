import { useEditorStore } from "@/store/editorStore";
import { useEffect } from "react";
import { ToolbarButton } from "./ToolbarButton";
import { Undo2, Redo2 } from "lucide-react";

export const HistoryTool = () => {
  const { undo, redo, historyIndex, history } = useEditorStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const undoKey = isMac ? e.metaKey && e.key === "z" && !e.shiftKey : e.ctrlKey && e.key === "z" && !e.shiftKey;
      const redoKey = isMac ? e.metaKey && e.key === "z" && e.shiftKey : e.ctrlKey && e.key === "y";

      if (undoKey) {
        e.preventDefault();
        undo();
      }
      if (redoKey) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  return (
    <div className="flex items-center gap-1.5">
      <ToolbarButton onClick={undo} disabled={!canUndo} label="Undo" showLabel>
        <Undo2 className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton onClick={redo} disabled={!canRedo} label="Redo" showLabel>
        <Redo2 className="h-5 w-5" />
      </ToolbarButton>
    </div>
  );
};
