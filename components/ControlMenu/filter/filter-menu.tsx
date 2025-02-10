"use client";

import { Filter } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MenuContainer,
  useControlMenu,
  FilterForm,
  filterOptions,
  FilterSchema,
  FilterFormData,
} from "@/components/ControlMenu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FilterMenu = () => {
  const menuConfig = {
    form: useForm<FilterFormData>({
      resolver: zodResolver(FilterSchema),
      defaultValues: {
        regions: [],
        shapes: [],
        isImplemented: [],
      },
    }),
    onUpdateParams: (data: FilterFormData, params: URLSearchParams) => {
      Object.entries(data).forEach(([key, values]) => {
        if (values.length > 0) {
          params.set(key, values.join(","));
        } else {
          params.delete(key);
        }
      });
      return params;
    },
    toastMessage: "フィルターを適用しました",
  };

  const { form, isMobile, ...menuProps } =
    useControlMenu<FilterFormData>(menuConfig);

  return (
    <MenuContainer<FilterFormData>
      title="フィルター"
      icon={<Filter className="h-4 w-4" />}
      form={form}
      immediateUpdate={!isMobile}
      {...menuProps}
    >
      <Accordion type="multiple" className="w-full">
        {Object.values(filterOptions).map((option) => (
          <AccordionItem key={option.value} value={option.value}>
            <AccordionTrigger>{option.label}</AccordionTrigger>
            <AccordionContent>
              <FilterForm
                key={option.value}
                form={form}
                name={option.value}
                items={option.items}
                handleChange={menuProps.handleChange}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </MenuContainer>
  );
};
