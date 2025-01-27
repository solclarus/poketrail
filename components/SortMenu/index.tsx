"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import { ArrowUpDown } from "lucide-react";

import { SortForm } from "./SortForm";
import { SortFormData, SortSchema } from "@/schemas";
import { toast, useMediaQuery, useSort } from "@/hooks";

export const SortMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const form = useForm<SortFormData>({
    resolver: zodResolver(SortSchema),
    defaultValues: {
      sort: "index",
      order: "asc",
    },
  });

  useSort(searchParams, form);

  const onSubmit = (data: SortFormData) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", data.sort);
    params.set("order", data.order);

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);

    toast({
      title: "ソートしました",
    });
  };

  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>ソート</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SortForm isMobile={isMobile} onSubmit={onSubmit} />
            <Button type="submit" className="w-full">
              適用
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SortForm isMobile={isMobile} onSubmit={onSubmit} />
      </form>
    </Form>
  );
};
