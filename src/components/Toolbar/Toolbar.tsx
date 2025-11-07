import { CropTool } from "./CropTool";
import { HistoryTool } from "./HistoryTool";
import { ImageUploader } from "./ImageUploader";
import { RotateTool } from "./RotateTool";
import { SelectionTool } from "./SelectionTool";
import { ExportTool } from "./ExportTool";

export const Toolbar = () => {
  return (
    <div className="bg-muted p-2 flex items-center gap-4">
      <ImageUploader />
      <CropTool />
      <RotateTool />
      <HistoryTool />
      <SelectionTool />
      <div className="ml-auto">
        <ExportTool />
      </div>
    </div>
  );
};
