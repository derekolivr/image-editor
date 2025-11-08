import { AdjustmentPanel } from "./AdjustmentPanel";

export const PropertiesPanel = () => {
  return (
    <div className="w-80 bg-gray-700 border-l border-gray-600 p-4">
      <h2 className="text-lg font-semibold mb-4">Adjustments</h2>
      <AdjustmentPanel />
    </div>
  );
};
