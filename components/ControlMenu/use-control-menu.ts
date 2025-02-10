"use client"

import { useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery, toast } from "@/hooks";
import { UseFormReturn } from "react-hook-form";

export const useControlMenu = <T extends object>({
  form,
  onUpdateParams,
  immediateUpdate = true,
  toastMessage = "更新しました",
}: {
  form: UseFormReturn<T>;
  onUpdateParams: (data: T, params: URLSearchParams) => URLSearchParams;
  immediateUpdate?: boolean;
  toastMessage?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const updateUrl = useCallback(
    (data: T) => {
      const params = new URLSearchParams(searchParams);
      const updatedParams = onUpdateParams(data, params);
      router.push(`${pathname}?${updatedParams.toString()}`);
      toast({ title: toastMessage });
    },
    [pathname, router, searchParams, onUpdateParams, toastMessage]
  );

  const handleChange = useCallback(
    (data: Partial<T>) => {
      if (!isMobile && immediateUpdate) {
        updateUrl({ ...form.getValues(), ...data });
      }
    },
    [form, isMobile, immediateUpdate, updateUrl]
  );

  const onSubmit = useCallback(
    (data: T) => {
      updateUrl(data);
      setIsOpen(false);
    },
    [updateUrl]
  );

  return {
    form,
    isOpen,
    setIsOpen,
    isMobile,
    onSubmit,
    updateUrl,
    handleChange,
  };
};