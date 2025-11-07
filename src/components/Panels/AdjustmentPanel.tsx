import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { applyBrightness, applyContrast, applyBlur } from "@/utils/imageFilters";
import { debounce } from "@/lib/utils";
import { useMemo } from "react";

export const AdjustmentPanel = () => {
  const handleBrightnessChange = useMemo(() => debounce((value: number) => applyBrightness(value), 100), []);
  const handleContrastChange = useMemo(() => debounce((value: number) => applyContrast(value), 100), []);
  const handleBlurChange = useMemo(() => debounce((value: number) => applyBlur(value), 100), []);

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
          onValueChange={(value) => handleBrightnessChange(value[0])}
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
          onValueChange={(value) => handleContrastChange(value[0])}
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
          onValueChange={(value) => handleBlurChange(value[0])}
        />
      </div>
    </div>
  );
};
