import { applyBrightness, applyContrast, applyBlur } from "@/utils/imageFilters";
import { debounce } from "@/utils/debounce";
import { useMemo } from "react";

export const AdjustmentPanel = () => {
  const handleBrightnessChange = useMemo(() => debounce((value: number) => applyBrightness(value), 100), []);
  const handleContrastChange = useMemo(() => debounce((value: number) => applyContrast(value), 100), []);
  const handleBlurChange = useMemo(() => debounce((value: number) => applyBlur(value), 100), []);

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label htmlFor="brightness">Brightness</label>
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
        <label htmlFor="contrast">Contrast</label>
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
        <label htmlFor="blur">Blur</label>
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
    </div>
  );
};
