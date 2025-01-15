"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { toast } from "@/hooks/use-toast";
import { ArrowUpDown, X } from "lucide-react";
import { SortSchema } from "./schema";
import { orderOptions, sortOptions } from "./data";

export const SortPopover = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof SortSchema>>({
    resolver: zodResolver(SortSchema),
    defaultValues: {
      sortBy: "index",
      order: "asc",
    },
  });

  useEffect(() => {
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");
    if (sortBy) {
      form.setValue("sortBy", sortBy);
    }
    if (order && (order === "asc" || order === "desc")) {
      form.setValue("order", order);
    }
  }, [searchParams, form]);

  function onSubmit(data: z.infer<typeof SortSchema>) {
    const params = new URLSearchParams(searchParams);

    params.set("sortBy", data.sortBy);
    params.set("order", data.order);

    router.push(`/?${params.toString()}`);
    setIsOpen(false);

    toast({
      title: "ソート設定を適用しました",
    });
  }

  const currentSort = form.watch("sortBy");
  const currentOrder = form.watch("order");

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          <ArrowUpDown className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">
            ソート
            {currentSort && currentOrder && (
              <span className="ml-2 text-xs opacity-50">
                {
                  sortOptions.find((option) => option.value === currentSort)
                    ?.label
                }
                (
                {
                  orderOptions.find((option) => option.value === currentOrder)
                    ?.label
                }
                )
              </span>
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">ソート設定</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">閉じる</span>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <FormField
              control={form.control}
              name="sortBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    ソート項目
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {sortOptions.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    ソート順
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      {orderOptions.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              ソート適用
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
