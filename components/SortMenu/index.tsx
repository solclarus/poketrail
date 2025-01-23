"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { toast } from "@/hooks/use-toast";
import { ArrowUpDown } from "lucide-react";
import { SortSchema } from "./schema";
import { orderOptions, sortOptions } from "./option";
import { useMediaQuery } from "@/hooks/use-media-query";

export const SortMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const form = useForm<z.infer<typeof SortSchema>>({
    resolver: zodResolver(SortSchema),
    defaultValues: {
      sort: "index",
      order: "asc",
    },
  });

  useEffect(() => {
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");
    if (
      sort &&
      (sort === "index" || sort === "name" || sort === "implemented_date")
    ) {
      form.setValue("sort", sort);
    }
    if (order && (order === "asc" || order === "desc")) {
      form.setValue("order", order);
    }
  }, [searchParams, form]);

  const onSubmit = (data: z.infer<typeof SortSchema>) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", data.sort);
    params.set("order", data.order);

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);

    toast({
      title: "ソートしました",
    });
  };

  const SortContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">項目</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sortOptions.map((option, i) => (
                    <SelectItem
                      key={i}
                      value={option.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <FormLabel className="text-sm font-semibold">ソート順</FormLabel>
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
          適用
        </Button>
      </form>
    </Form>
  );

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
        <SortContent />
      </SheetContent>
    </Sheet>
  ) : (
    <div className="border rounded-md backdrop-blur-sm p-3">
      <SortContent />
    </div>
  );
};
