"use client";

import { ArrowUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useControlMenu,
  MenuContainer,
  SortForm,
  SortSchema,
  SortFormData,
} from "@/components/ControlMenu";

export const SortMenu = () => {
  const menuConfig = {
    form: useForm<SortFormData>({
      resolver: zodResolver(SortSchema),
      defaultValues: {
        sort: "index",
        order: "asc",
      },
    }),
    onUpdateParams: (data: SortFormData, params: URLSearchParams) => {
      if (data.sort) params.set("sort", data.sort);
      if (data.order) params.set("order", data.order);
      return params;
    },
    toastMessage: "ソートを適用しました",
  };

  const { form, isMobile, ...menuProps } =
    useControlMenu<SortFormData>(menuConfig);

  return (
    <MenuContainer<SortFormData>
      title="ソート"
      icon={<ArrowUpDown className="h-4 w-4" />}
      form={form}
      immediateUpdate={!isMobile}
      {...menuProps}
    >
      <SortForm handleChange={menuProps.handleChange} control={form.control} />
    </MenuContainer>
  );
};
