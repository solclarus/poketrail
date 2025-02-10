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
import { ArrowUpDown } from "lucide-react";

import { useSortMenu, SortForm } from "@/components/SortMenu";

export const SortMenu = () => {
  const { form, isOpen, isMobile, setIsOpen, onSubmit } = useSortMenu();

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
            <SortForm />
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
        <SortForm />
      </form>
    </Form>
  );
};
