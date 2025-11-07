import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useEditorStore, type EditorState } from "@/store/editorStore";
import { addCropRectangle, removeCropRectangle } from "@/utils/CropRectangle";

export const ImageCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useEditorStore((state: EditorState) => state.canvas);
  const setCanvas = useEditorStore((state: EditorState) => state.setCanvas);
  const isCropping = useEditorStore((state: EditorState) => state.isCropping);
  const setSelection = useEditorStore((state: EditorState) => state.setSelection);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasInstance = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#f0f0f0",
      });
      setCanvas(canvasInstance);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvasInstance.on("selection:created", (e: any) => setSelection(e.target || null));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvasInstance.on("selection:updated", (e: any) => setSelection(e.target || null));
      canvasInstance.on("selection:cleared", () => setSelection(null));

      return () => {
        canvasInstance.dispose();
        setCanvas(null);
      };
    }
  }, [setCanvas, setSelection]);

  useEffect(() => {
    if (canvas) {
      if (isCropping) {
        addCropRectangle(canvas);
      } else {
        removeCropRectangle(canvas);
      }
    }
  }, [isCropping, canvas]);

  return <canvas ref={canvasRef} />;
};
