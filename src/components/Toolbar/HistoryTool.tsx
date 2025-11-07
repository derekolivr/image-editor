import { useEditorStore } from "@/store/editorStore";
import { useEffect } from "react";

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
    <div className="flex gap-2">
      <button
        onClick={undo}
        disabled={!canUndo}
        className="p-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className="p-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
      >
        Redo
      </button>
    </div>
  );
};
