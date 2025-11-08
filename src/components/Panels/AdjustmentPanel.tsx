import {
  applyBrightness,
  applyContrast,
  applyBlur,
  applyGrayscale,
  removeGrayscale,
  applySepia,
  removeSepia,
} from "@/utils/imageFilters";
import { debounce } from "@/utils/debounce";
import { useMemo, useState } from "react";
import { useEditorStore } from "@/store/editorStore";

export const AdjustmentPanel = () => {
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isSepia, setIsSepia] = useState(false);
  const { selection } = useEditorStore();

  const handleBrightnessChange = useMemo(() => debounce((value: number) => applyBrightness(value), 100), []);
  const handleContrastChange = useMemo(() => debounce((value: number) => applyContrast(value), 100), []);
  const handleBlurChange = useMemo(() => debounce((value: number) => applyBlur(value), 100), []);

  const toggleGrayscale = () => {
    if (isGrayscale) {
      removeGrayscale();
      setIsGrayscale(false);
    } else {
      applyGrayscale();
      setIsGrayscale(true);
      // Remove sepia if it's active
      if (isSepia) {
        removeSepia();
        setIsSepia(false);
      }
    }
  };

  const toggleSepia = () => {
    if (isSepia) {
      removeSepia();
      setIsSepia(false);
    } else {
      applySepia();
      setIsSepia(true);
      // Remove grayscale if it's active
      if (isGrayscale) {
        removeGrayscale();
        setIsGrayscale(false);
      }
    }
  };

  return (
    <div className="p-4 space-y-4">
      {selection && (
        <div className="mb-4 p-3 bg-blue-600 rounded-md">
          <p className="text-sm font-medium text-white">✓ Region Selected</p>
          <p className="text-xs text-blue-100 mt-1">Filters will apply only to the selected area</p>
        </div>
      )}
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="brightness" className="text-sm font-medium">
            Brightness
          </label>
          <input
            id="brightness"
            type="range"
            defaultValue={0}
            min={-100}
            max={100}
            step={1}
            onChange={(e) => handleBrightnessChange(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contrast" className="text-sm font-medium">
            Contrast
          </label>
          <input
            id="contrast"
            type="range"
            defaultValue={0}
            min={-100}
            max={100}
            step={1}
            onChange={(e) => handleContrastChange(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="blur" className="text-sm font-medium">
            Blur
          </label>
          <input
            id="blur"
            type="range"
            defaultValue={0}
            min={0}
            max={100}
            step={1}
            onChange={(e) => handleBlurChange(Number(e.target.value))}
          />
        </div>

        <div className="pt-4 border-t border-gray-600">
          <h3 className="text-sm font-medium mb-3">Filters</h3>
          <div className="space-y-3">
            <button
              onClick={toggleGrayscale}
              className={`w-full p-3 rounded-md text-sm font-medium transition-colors ${
                isGrayscale ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-100 hover:bg-gray-500"
              }`}
            >
              {isGrayscale ? "✓ " : ""}Grayscale
            </button>
            <button
              onClick={toggleSepia}
              className={`w-full p-3 rounded-md text-sm font-medium transition-colors ${
                isSepia ? "bg-amber-600 text-white" : "bg-gray-600 text-gray-100 hover:bg-gray-500"
              }`}
            >
              {isSepia ? "✓ " : ""}Sepia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
