import { CropTool } from "./CropTool";
import { HistoryTool } from "./HistoryTool";
import { ImageUploader } from "./ImageUploader";
import { RotateTool } from "./RotateTool";
import { SelectionTool } from "./SelectionTool";
import { ExportTool } from "./ExportTool";
import { RevertTool } from "./RevertTool";

export const Toolbar = () => {
  return (
    <div className="bg-gray-700 p-2 flex items-center gap-6 border-b border-gray-600">
      <ImageUploader />
      <div className="h-6 border-l border-gray-500" />
      <CropTool />
      <RotateTool />
      <HistoryTool />
      <RevertTool />
      <SelectionTool />
      <div className="ml-auto">
        <ExportTool />
      </div>
    </div>
  );
};
