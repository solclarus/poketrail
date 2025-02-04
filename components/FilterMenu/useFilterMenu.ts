"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { toast, useMediaQuery } from "@/hooks";
import {
  type FilterFormData,
  FilterSchema,
} from "@/components/FilterMenu/schema";
import {
  filterOptions,
  isImplemented,
  regions,
  shapes,
} from "@/components/FilterMenu/option";
import { FilterOption } from "@/components/FilterMenu/option";

// URL の searchParams をフォームの値に同期するカスタムフック
const useParamValues = (
  searchParams: URLSearchParams,
  form: UseFormReturn<FilterFormData>
) => {
  useEffect(() => {
    const getParamValues = (key: keyof FilterFormData) =>
      searchParams.get(key)?.split(",") || [];

    form.setValue("regions", getParamValues("regions"));
    form.setValue("shapes", getParamValues("shapes"));
    form.setValue("isImplemented", getParamValues("isImplemented"));
  }, [searchParams, form]);
};

// フィルターメニューのロジックを管理するカスタムフック
export const useFilterMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const form = useForm<FilterFormData>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      regions: regions.map((option) => option.value),
      shapes: shapes.map((option) => option.value),
      isImplemented: isImplemented.map((option) => option.value),
    },
  });

  // searchParams の変化に応じてフォームの値を同期
  useParamValues(searchParams, form);

  // フォーム送信時の処理
  const onSubmit = useCallback(
    (data: FilterFormData) => {
      const params = new URLSearchParams(searchParams);

      Object.keys(filterOptions).forEach((key) => {
        const paramKey = key as keyof FilterFormData;
        if (data[paramKey].length > 0) {
          params.set(key, data[paramKey].join(","));
        } else {
          params.delete(paramKey);
        }
      });

      router.push(`${pathname}?${params.toString()}`);
      setIsOpen(false);

      toast({
        title: "フィルタリングしました",
      });
    },
    [pathname, router, searchParams]
  );

  // フィルタリング共通関数
  const updateFilter = useCallback(
    (name: keyof FilterFormData, values: string[]) => {
      form.setValue(name, values);
      if (!isMobile) form.handleSubmit(onSubmit)();
    },
    [form, isMobile, onSubmit]
  );

  // オプションを選択
  const toggleOption = useCallback(
    (name: keyof FilterFormData, value: string) => {
      const values = form.getValues(name);
      updateFilter(
        name,
        values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value]
      );
    },
    [form, updateFilter]
  );

  // オプションを全選択
  const selectOptions = useCallback(
    (name: keyof FilterFormData, options?: FilterOption[]) => {
      updateFilter(name, options ? options.map((option) => option.value) : []);
    },
    [updateFilter]
  );

  // アコーディオンの開閉状態を管理
  const handleAccordion = useCallback((value: string) => {
    setOpenAccordions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }, []);

  return {
    form,
    isOpen,
    setIsOpen,
    isMobile,
    openAccordions,
    selectOptions,
    toggleOption,
    handleAccordion,
    onSubmit,
  };
};
