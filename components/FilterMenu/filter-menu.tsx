"use client";

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
import { FilterAccordion } from "./filter-accordion";
import { useFilterMenu } from "@/components/FilterMenu";

export const FilterMenu = () => {
  const { form, isOpen, isMobile, setIsOpen, onSubmit } = useFilterMenu();

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
            <FilterAccordion />
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
        <FilterAccordion />
      </form>
    </Form>
  );
};
