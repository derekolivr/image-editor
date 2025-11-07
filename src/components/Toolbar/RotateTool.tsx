import { useEditorStore } from "@/store/editorStore";

export const RotateTool = () => {
  const { canvas, image, addToHistory } = useEditorStore();

  const rotate = (angle: number) => {
    if (image && canvas) {
      const newAngle = (image.angle || 0) + angle;
      image.rotate(newAngle);
      canvas.renderAll();
      addToHistory();
    }
  };

  const flip = (axis: "x" | "y") => {
    if (image && canvas) {
      if (axis === "x") {
        image.flipX = !image.flipX;
      } else {
        image.flipY = !image.flipY;
      }
      canvas.renderAll();
      addToHistory();
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => rotate(-90)} className="p-2 bg-secondary rounded">
        Rotate Left
      </button>
      <button onClick={() => rotate(90)} className="p-2 bg-secondary rounded">
        Rotate Right
      </button>
      <button onClick={() => flip("x")} className="p-2 bg-secondary rounded">
        Flip Horizontal
      </button>
      <button onClick={() => flip("y")} className="p-2 bg-secondary rounded">
        Flip Vertical
      </button>
    </div>
  );
};
