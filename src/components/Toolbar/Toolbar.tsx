import { CropTool } from "./CropTool";
import { HistoryTool } from "./HistoryTool";
import { ImageUploader } from "./ImageUploader";
import { RotateTool } from "./RotateTool";
import { SelectionTool } from "./SelectionTool";
import { BrushSelectionTool } from "./BrushSelectionTool";
import { ShapesTool } from "./ShapesTool";
import { TextTool } from "./TextTool";
import { DeleteTool } from "./DeleteTool";
import { ExportTool } from "./ExportTool";
import { RevertTool } from "./RevertTool";

const ToolSection = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <div className="px-1 h-4 flex items-center">
      <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{label}</span>
    </div>
    <div className="flex items-center gap-1.5">{children}</div>
  </div>
);

export const Toolbar = () => {
  return (
    <div className="bg-gray-800 px-4 pt-2 pb-1.5 flex items-end gap-4 border-b border-gray-700 shadow-lg">
      <ToolSection label="File">
        <ImageUploader />
        <ExportTool />
      </ToolSection>

      <div className="h-8 w-px bg-gray-600" />

      <ToolSection label="Transform">
        <CropTool />
        <RotateTool />
      </ToolSection>

      <div className="h-8 w-px bg-gray-600" />

      <ToolSection label="History">
        <HistoryTool />
        <RevertTool />
      </ToolSection>

      <div className="h-8 w-px bg-gray-600" />

      <ToolSection label="Selection">
        <SelectionTool />
        <BrushSelectionTool />
      </ToolSection>

      <div className="h-8 w-px bg-gray-600" />

      <ToolSection label="Draw">
        <ShapesTool />
        <TextTool />
        <DeleteTool />
      </ToolSection>
    </div>
  );
};
