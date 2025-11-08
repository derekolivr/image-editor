import { useEditorStore } from "@/store/editorStore";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const PerformanceStats = () => {
  const performanceMetrics = useEditorStore((state) => state.performanceMetrics);
  const [fps, setFps] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;

      // Update FPS every second
      if (elapsed >= 1000) {
        setFps(Math.round((frameCount * 1000) / elapsed));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="mt-6 pt-4 border-t border-gray-600">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
      >
        <span>Performance Metrics</span>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isExpanded && (
        <div className="space-y-3 text-xs">
          {/* FPS Counter */}
          <div className="bg-gray-600 p-3 rounded-md">
            <div className="font-medium text-gray-300 mb-1">Real-time FPS</div>
            <div className="text-2xl font-bold text-blue-400">{fps}</div>
          </div>

          {/* Last Operation */}
          {performanceMetrics.lastOperation && (
            <div className="bg-gray-600 p-3 rounded-md">
              <div className="font-medium text-gray-300 mb-1">Last Operation</div>
              <div className="text-sm capitalize">{performanceMetrics.lastOperation}</div>
              <div className="text-xl font-bold text-green-400 mt-1">
                {performanceMetrics.lastFilterTime?.toFixed(2)} ms
              </div>
            </div>
          )}

          {/* Statistics */}
          {performanceMetrics.totalOperations > 0 && (
            <div className="bg-gray-600 p-3 rounded-md space-y-2">
              <div className="font-medium text-gray-300 mb-2">Filter Statistics</div>

              <div className="flex justify-between">
                <span className="text-gray-400">Total Operations:</span>
                <span className="font-semibold">{performanceMetrics.totalOperations}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Average Time:</span>
                <span className="font-semibold text-yellow-400">
                  {performanceMetrics.averageFilterTime.toFixed(2)} ms
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Min Time:</span>
                <span className="font-semibold text-green-400">{performanceMetrics.minFilterTime?.toFixed(2)} ms</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Max Time:</span>
                <span className="font-semibold text-red-400">{performanceMetrics.maxFilterTime?.toFixed(2)} ms</span>
              </div>
            </div>
          )}

          {/* Recent Operations */}
          {performanceMetrics.filterHistory.length > 0 && (
            <div className="bg-gray-600 p-3 rounded-md">
              <div className="font-medium text-gray-300 mb-2">Recent Operations</div>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {performanceMetrics.filterHistory
                  .slice(-10)
                  .reverse()
                  .map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-1 border-b border-gray-500 last:border-0"
                    >
                      <span className="capitalize text-gray-300">{entry.operation}</span>
                      <span className="font-mono text-xs">{entry.duration.toFixed(2)} ms</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {performanceMetrics.totalOperations === 0 && (
            <div className="text-gray-400 text-center py-4">
              No operations recorded yet. Apply a filter to see performance metrics.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
