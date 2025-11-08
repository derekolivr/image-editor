import { ImageCanvas } from "./ImageCanvas";

export const CanvasContainer = () => {
  return (
    <div className="flex-grow flex items-center justify-center p-4 overflow-auto">
      <ImageCanvas />
    </div>
  );
};
