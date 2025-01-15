"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
import { FilterIcon, X } from "lucide-react";
import { FilterSchema } from "./schema";
import { forms, regions } from "./data";

export const FilterPopover = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      regions: [],
      forms: [],
    },
  });

  useEffect(() => {
    const regionsParam = searchParams.get("regions");
    const formsParam = searchParams.get("forms");
    if (regionsParam) {
      const parsedRegions = regionsParam.split(",");
      setSelectedRegions(parsedRegions);
      form.setValue("regions", parsedRegions);
    }
    if (formsParam) {
      const parsedForms = formsParam.split(",");
      setSelectedForms(parsedForms);
      form.setValue("forms", parsedForms);
    }
  }, [searchParams, form]);

  function onSubmit(data: z.infer<typeof FilterSchema>) {
    const params = new URLSearchParams(searchParams);

    if (data.regions.length > 0) {
      params.set("regions", data.regions.join(","));
    } else {
      params.delete("regions");
    }

    if (data.forms.length > 0) {
      params.set("forms", data.forms.join(","));
    } else {
      params.delete("forms");
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);

    toast({
      title: "フィルターを適用しました",
    });
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          <FilterIcon className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">
            フィルター
            {(selectedRegions.length > 0 || selectedForms.length > 0) && (
              <span className="ml-2 inline-flex size-4 items-center justify-center rounded-full text-xs text-primary-foreground bg-primary">
                {selectedRegions.length + selectedForms.length}
              </span>
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">フィルター設定</h4>
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
              name="regions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    地域フィルター
                  </FormLabel>
                  <FormDescription className="text-xs">
                    表示したい地域を選択してください。
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {regions.map((item) => (
                      <FormItem
                        key={item.value}
                        className="flex items-center space-x-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="forms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    形態フィルター
                  </FormLabel>
                  <FormDescription className="text-xs">
                    表示したい形態を選択してください。
                  </FormDescription>
                  <div className="flex flex-col gap-2 mt-2">
                    {forms.map((item) => (
                      <FormItem
                        key={item.value}
                        className="flex items-center space-x-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              フィルター適用
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
