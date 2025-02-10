import { Control } from "react-hook-form";
import {
  RangeFormData,
  DateRangeField,
  IndexRangeField,
} from "@/components/ControlMenu";

type RangeFormProps = {
  control: Control<RangeFormData>;
  handleChange: (data: Partial<RangeFormData>) => void;
};

export const RangeForm = ({ control, handleChange }: RangeFormProps) => (
  <div className="space-y-12">
    <IndexRangeField control={control} handleChange={handleChange} />
    <DateRangeField control={control} handleChange={handleChange} />
  </div>
);
