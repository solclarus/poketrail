"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast, useMediaQuery } from "@/hooks";
import { useForm, UseFormSetValue } from "react-hook-form";
import { SortFormData, SortSchema } from "@/components/SortMenu/schema";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * URL の searchParams をソート条件に同期するカスタムフック
 */
const useSortValues = (
  searchParams: URLSearchParams,
  setValue: UseFormSetValue<SortFormData>
) => {
  useEffect(() => {
    const sortValue =
      (searchParams.get("sort") as "index" | "name" | "implemented_date") ||
      "index";
    const orderValue = (searchParams.get("order") as "asc" | "desc") || "asc";

    setValue("sort", sortValue);
    setValue("order", orderValue);
  }, [searchParams, setValue]);
};

/**
 * ソートメニューのロジックを管理するカスタムフック
 */
export const useSortMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const form = useForm<SortFormData>({
    resolver: zodResolver(SortSchema),
    defaultValues: { sort: "index", order: "asc" },
  });

  useSortValues(searchParams, form.setValue);

  /**
   * ソート条件を更新し、URL に反映
   */
  const updateSort = useCallback(
    (
      sort: SortFormData["sort"] = "index",
      order: SortFormData["order"] = "asc"
    ) => {
      const params = new URLSearchParams(searchParams);
      params.set("sort", sort);
      params.set("order", order);
      router.push(`${pathname}?${params.toString()}`);
      toast({ title: "ソートしました" });
    },
    [pathname, router, searchParams]
  );

  /**
   * フォーム送信時の処理
   */
  const onSubmit = useCallback(
    (data: SortFormData) => {
      updateSort(data.sort, data.order);
      setIsOpen(false);
    },
    [updateSort]
  );

  return {
    form,
    isOpen,
    setIsOpen,
    isMobile,
    onSubmit,
    updateSort,
  };
};
