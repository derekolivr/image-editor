import { useEditorStore } from "@/store/editorStore";
import * as fabric from "fabric";

export const SelectionTool = () => {
  const { canvas } = useEditorStore();

  const enterSelectionMode = () => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 200,
        height: 150,
        fill: "rgba(0,0,0,0.3)",
        stroke: "#ccc",
        strokeDashArray: [4, 4],
        cornerColor: "#f0f0f0",
        cornerSize: 10,
        transparentCorners: false,
        cornerStyle: "circle",
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    }
  };

  return (
    <button onClick={enterSelectionMode} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
      Select
    </button>
  );
};
