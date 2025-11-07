import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { applyBrightness, applyContrast, applyBlur } from "@/utils/imageFilters";
import { debounce } from "@/lib/utils";
import { useCallback } from "react";

export const AdjustmentPanel = () => {
  const debouncedApplyBrightness = useCallback(debounce(applyBrightness, 100), []);
  const debouncedApplyContrast = useCallback(debounce(applyContrast, 100), []);
  const debouncedApplyBlur = useCallback(debounce(applyBlur, 100), []);

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="brightness">Brightness</Label>
        <Slider
          id="brightness"
          defaultValue={[0]}
          min={-100}
          max={100}
          step={1}
          onValueChange={(value) => debouncedApplyBrightness(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contrast">Contrast</Label>
        <Slider
          id="contrast"
          defaultValue={[0]}
          min={-100}
          max={100}
          step={1}
          onValueChange={(value) => debouncedApplyContrast(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="blur">Blur</Label>
        <Slider
          id="blur"
          defaultValue={[0]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => debouncedApplyBlur(value[0])}
        />
      </div>
    </div>
  );
};
