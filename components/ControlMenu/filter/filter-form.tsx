"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FilterOption, FilterFormData } from "@/components/ControlMenu";
import type { UseFormReturn } from "react-hook-form";

type FilterFormProps = {
  form: UseFormReturn<FilterFormData>;
  name: keyof FilterFormData;
  items: FilterOption[];
  handleChange: (data: Partial<FilterFormData>) => void;
};

export const FilterForm = ({
  form,
  name,
  items,
  handleChange,
}: FilterFormProps) => {
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
                    onCheckedChange={() => {
                      const newValues = field.value.includes(item.value)
                        ? field.value.filter((v) => v !== item.value)
                        : [...field.value, item.value];
                      field.onChange(newValues);
                      handleChange({ [name]: newValues });
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {item.label}
                </FormLabel>
              </FormItem>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={() => {
              const newValues =
                field.value?.length === items.length
                  ? []
                  : items.map((i) => i.value);
              field.onChange(newValues);
              handleChange({ [name]: newValues });
            }}
          >
            {field.value?.length === items.length ? "クリア" : "全選択"}
          </Button>
        </FormItem>
      )}
    />
  );
};
