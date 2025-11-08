import { useEditorStore } from "@/store/editorStore";
import { ToolbarButton } from "./ToolbarButton";
import { Download } from "lucide-react";

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
    <ToolbarButton onClick={handleExport} label="Export" showLabel>
      <Download className="h-5 w-5" />
    </ToolbarButton>
  );
};
