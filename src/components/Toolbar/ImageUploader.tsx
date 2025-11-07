import { useEditorStore } from "@/store/editorStore";
import * as fabric from "fabric";
import type { ChangeEvent } from "react";
import { initializeFilters } from "@/utils/imageFilters";

export const ImageUploader = () => {
  const { canvas, setImage } = useEditorStore();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgObj = new Image();
        imgObj.src = event.target?.result as string;
        imgObj.onload = () => {
          const image = new fabric.Image(imgObj);
          canvas.setWidth(imgObj.width);
          canvas.setHeight(imgObj.height);
          canvas.add(image);
          canvas.centerObject(image);
          image.scaleToWidth(canvas.getWidth());
          setImage(image);
          initializeFilters(); // Initialize filters for the new image
          canvas.renderAll();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
      <label htmlFor="image-upload" className="bg-blue-600 text-white p-2 rounded cursor-pointer hover:bg-blue-700">
        Upload Image
      </label>
    </div>
  );
};
