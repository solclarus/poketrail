"use client";

import { SlidersHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MenuContainer,
  useControlMenu,
  RangeFormData,
  RangeSchema,
  RangeForm,
} from "@/components/ControlMenu";
import { format } from "date-fns";

export const RangeMenu = () => {
  const menuConfig = {
    form: useForm<RangeFormData>({
      resolver: zodResolver(RangeSchema),
      defaultValues: {
        index: { min: undefined, max: undefined },
        date: { start: undefined, end: undefined },
      },
    }),
    onUpdateParams: (data: RangeFormData, params: URLSearchParams) => {
      if (data.index.min) params.set("indexMin", data.index.min.toString());
      if (data.index.max) params.set("indexMax", data.index.max.toString());

      if (data.date.start)
        params.set(
          "implementedDateStart",
          format(data.date.start, "yyyy-MM-dd")
        );
      if (data.date.end)
        params.set("implementedDateEnd", format(data.date.end, "yyyy-MM-dd"));
      return params;
    },
    toastMessage: "範囲を適用しました",
  };

  const { form, isMobile, ...menuProps } =
    useControlMenu<RangeFormData>(menuConfig);

  return (
    <MenuContainer<RangeFormData>
      title="レンジ"
      icon={<SlidersHorizontal className="h-4 w-4" />}
      form={form}
      immediateUpdate={!isMobile}
      {...menuProps}
    >
      <RangeForm handleChange={menuProps.handleChange} control={form.control} />
    </MenuContainer>
  );
};
