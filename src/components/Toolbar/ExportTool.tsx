import { useEditorStore } from "@/store/editorStore";

export const ExportTool = () => {
  const { canvas } = useEditorStore();

  const handleExport = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 1,
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `edited-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button onClick={handleExport} className="p-2 bg-blue-500 text-white rounded">
      Export as PNG
    </button>
  );
};
