import { FormField, FormItem } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { RangeFormData } from "@/components/ControlMenu";
import { DateTimePicker } from "@/components/ui/datetime-picker";

type DateRangeFieldProps = {
  control: Control<RangeFormData>;
  handleChange: (data: Partial<RangeFormData>) => void;
};

export const DateRangeField = ({
  control,
  handleChange,
}: DateRangeFieldProps) => (
  <div>
    <h3 className="mb-2 text-sm font-bold">実装日</h3>
    <FormField
      control={control}
      name="date.start"
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <DateTimePicker
            yearRange={10}
            showOutsideDays={false}
            placeholder={"開始日"}
            displayFormat={{ hour24: "yyyy/MM/dd" }}
            granularity="day"
            value={value}
            onChange={(date) => {
              onChange(date);
              handleChange({
                date: { start: date },
              });
            }}
          />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="date.end"
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <DateTimePicker
            yearRange={10}
            showOutsideDays={false}
            placeholder={"終了日"}
            displayFormat={{ hour24: "yyyy/MM/dd" }}
            granularity="day"
            value={value}
            onChange={(date) => {
              onChange(date);
              handleChange({
                date: { end: date },
              });
            }}
          />
        </FormItem>
      )}
    />
  </div>
);
