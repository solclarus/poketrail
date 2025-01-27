import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import type { Option } from "@/types";
import { FilterFormData } from "@/schemas";

type FilterFormProps = {
  name: keyof FilterFormData;
  items: Option[];
  isMobile: boolean;
  onSubmit: (data: FilterFormData) => void;
};

export const FilterForm = ({
  name,
  items,
  isMobile,
  onSubmit,
}: FilterFormProps) => {
  const form = useFormContext<FilterFormData>();

  const handleSelectAll = () => {
    form.setValue(
      name,
      items.map((item) => item.value)
    );
    if (!isMobile) form.handleSubmit(onSubmit)();
  };

  const handleClearAll = () => {
    form.setValue(name, []);
    if (!isMobile) form.handleSubmit(onSubmit)();
  };

  const handleChange = (value: string) => {
    const currentValues = form.getValues(name);
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    form.setValue(name, newValues);
    if (!isMobile) form.handleSubmit(onSubmit)();
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {items.map((item) => (
              <FormItem
                key={item.value}
                className="flex items-center space-x-2"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.value)}
                    onCheckedChange={() => handleChange(item.value)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {item.label}
                </FormLabel>
              </FormItem>
            ))}
          </div>
          <div className="flex gap-1 mt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleClearAll}
            >
              クリア
            </Button>
            <Button
              type="button"
              variant="default"
              className="w-full"
              onClick={handleSelectAll}
            >
              全選択
            </Button>
          </div>
        </FormItem>
      )}
    />
  );
};
