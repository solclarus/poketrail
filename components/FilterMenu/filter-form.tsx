"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import type { SortOption } from "@/components/SortMenu/option";
import { FilterFormData } from "./schema";
import { useFilterMenu } from "@/components/FilterMenu";

type FilterFormProps = {
  name: keyof FilterFormData;
  items: SortOption[];
  isMobile: boolean;
  onSubmit: (data: FilterFormData) => void;
};

export const FilterForm = ({ name, items }: FilterFormProps) => {
  const { form, selectOptions, toggleOption } = useFilterMenu();

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
                    onCheckedChange={() => toggleOption(name, item.value)}
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
              onClick={() => selectOptions(name)}
            >
              クリア
            </Button>
            <Button
              type="button"
              variant="default"
              className="w-full"
              onClick={() => selectOptions(name, items)}
            >
              全選択
            </Button>
          </div>
        </FormItem>
      )}
    />
  );
};
