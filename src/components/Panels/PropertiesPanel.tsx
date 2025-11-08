import { AdjustmentPanel } from "./AdjustmentPanel";
import { PerformanceStats } from "./PerformanceStats";

export const PropertiesPanel = () => {
  return (
    <div className="w-80 bg-gray-700 border-l border-gray-600 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Adjustments</h2>
      <AdjustmentPanel />
      <PerformanceStats />
    </div>
  );
};
