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
import { Filter } from "lucide-react";

import { FilterFormData, FilterSchema } from "@/schemas";
import { toast, useFilter, useMediaQuery } from "@/hooks";
import { FilterAccordion } from "./FilterAccordion";
import { isImplementeds, regions, shapes } from "./FilterOption";

export const FilterMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const form = useForm<FilterFormData>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      regions: regions.map((region) => region.value),
      shapes: shapes.map((shape) => shape.value),
      isImplementeds: isImplementeds.map(
        (isImplemented) => isImplemented.value
      ),
    },
  });

  useFilter(searchParams, form);

  const onSubmit = (data: FilterFormData) => {
    const params = new URLSearchParams(searchParams);

    if (data.regions.length > 0) {
      params.set("regions", data.regions.join(","));
    } else {
      params.delete("regions");
    }

    if (data.shapes.length > 0) {
      params.set("shapes", data.shapes.join(","));
    } else {
      params.delete("shapes");
    }

    if (data.isImplementeds.length > 0) {
      params.set("isImplementeds", data.isImplementeds.join(","));
    } else {
      params.delete("isImplementeds");
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);

    toast({
      title: "フィルタリングしました",
    });
  };

  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>フィルター</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FilterAccordion isMobile={isMobile} onSubmit={onSubmit} />
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
        <FilterAccordion isMobile={isMobile} onSubmit={onSubmit} />
      </form>
    </Form>
  );
};
