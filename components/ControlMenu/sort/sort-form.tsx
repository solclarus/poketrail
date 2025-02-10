"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { sortOptions, SortFormData } from "@/components/ControlMenu";
import { Control } from "react-hook-form";

type SortFormProps = {
  handleChange: (data: Partial<SortFormData>) => void;
  control: Control<SortFormData>;
};

export const SortForm = ({ handleChange, control }: SortFormProps) => {
  return (
    <>
      <FormField
        control={control}
        name="sort"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => {
                const sort = value as SortFormData["sort"];
                field.onChange(sort);
                handleChange({ sort });
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sortOptions.sort.items.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="order"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  const order = value as SortFormData["order"];
                  field.onChange(order);
                  handleChange({ order });
                }}
                value={field.value}
                className="flex space-x-4"
              >
                {sortOptions.order.items.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-center space-x-2 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};
