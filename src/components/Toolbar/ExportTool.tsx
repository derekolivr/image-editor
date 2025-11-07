import { useEditorStore } from "@/store/editorStore";
import { Button } from "@/components/ui/button";

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

  return <Button onClick={handleExport}>Export as PNG</Button>;
};
