"use client";

import { Control } from "react-hook-form";
import { RangeFormData } from "@/components/ControlMenu";
import { FormField, FormItem } from "@/components/ui/form";
import { useState } from "react";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

type IndexRangeFieldProps = {
  control: Control<RangeFormData>;
  handleChange: (data: Partial<RangeFormData>) => void;
};

export const IndexRangeField = ({
  control,
  handleChange,
}: IndexRangeFieldProps) => {
  const [range, setRange] = useState([1, 1025]);

  const updateRange = (newRange: number[]) => {
    setRange(newRange);
    handleChange({
      index: { min: newRange[0], max: newRange[1] },
    });
  };

  return (
    <div>
      <h3 className="mb-4 text-sm font-medium">図鑑番号</h3>
      <FormField
        control={control}
        name="index"
        render={() => (
          <FormItem>
            <DualRangeSlider
              label={(value) => value}
              labelPosition="bottom"
              value={range}
              onValueChange={updateRange}
              min={1}
              max={1025}
              step={1}
            />
          </FormItem>
        )}
      />
    </div>
  );
};
