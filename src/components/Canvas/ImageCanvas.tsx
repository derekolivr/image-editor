import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useEditorStore, type EditorState } from "@/store/editorStore";
import { addCropRectangle, removeCropRectangle } from "@/utils/CropRectangle";
import { ensureImageAtBack } from "@/utils/canvasHelpers";

export const ImageCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useEditorStore((state: EditorState) => state.canvas);
  const setCanvas = useEditorStore((state: EditorState) => state.setCanvas);
  const isCropping = useEditorStore((state: EditorState) => state.isCropping);
  const setSelection = useEditorStore((state: EditorState) => state.setSelection);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 1000,
        height: 800,
        backgroundColor: "#4b5563", // gray-600
      });
      setCanvas(canvas);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvas.on("selection:created", (e: any) => {
        const target = e.target;
        // Only track rectangle selections, not the main image
        if (target && target.type === "rect") {
          setSelection(target);
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvas.on("selection:updated", (e: any) => {
        const target = e.target;
        if (target && target.type === "rect") {
          setSelection(target);
        }
      });

      canvas.on("selection:cleared", () => {
        // When selection is cleared, just update the store
        // Don't automatically remove selection rectangles
        setSelection(null);
      });

      // Ensure image stays at back whenever objects are modified
      canvas.on("object:added", () => {
        ensureImageAtBack(canvas);
      });

      canvas.on("object:modified", () => {
        ensureImageAtBack(canvas);
      });

      return () => {
        canvas.dispose();
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

  return <canvas ref={canvasRef} className="border border-gray-500 shadow-lg" />;
};
