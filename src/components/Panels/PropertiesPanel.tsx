import { AdjustmentPanel } from "./AdjustmentPanel";
import { PerformanceStats } from "./PerformanceStats";

export const PropertiesPanel = () => {
  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto shadow-xl">
      <h2 className="text-lg font-bold mb-4 text-gray-100 border-b border-gray-700 pb-2">Adjustments</h2>
      <AdjustmentPanel />
      <PerformanceStats />
    </div>
  );
};
