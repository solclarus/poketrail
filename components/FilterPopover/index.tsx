"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Filter } from "lucide-react";
import { FilterSchema } from "./schema";
import { forms, Region, regions } from "./data";
import { useMediaQuery } from "@/hooks/use-media-query";

export const FilterPopover = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width: 640px)");

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

  const FilterContent = () => {
    const handleSelectAll = (
      field: ControllerRenderProps<
        {
          regions: string[];
          forms: string[];
        },
        "regions"
      >,
      items: Region[]
    ) => {
      field.onChange(items.map((item) => item.value));
    };

    const handleClearAll = (
      field: ControllerRenderProps<
        {
          regions: string[];
          forms: string[];
        },
        "regions"
      >
    ) => {
      field.onChange([]);
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="regions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">地方</FormLabel>
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
                <div className="flex gap-1 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleClearAll(field)}
                  >
                    クリア
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    className="w-full"
                    onClick={() => handleSelectAll(field, regions)}
                  >
                    全選択
                  </Button>
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
                  フォルム
                </FormLabel>
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
            適用
          </Button>
        </form>
      </Form>
    );
  };

  if (isMobile) {
    return (
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
          <FilterContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          <Filter className="md:mr-2 h-4 w-4" />
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
        <FilterContent />
      </PopoverContent>
    </Popover>
  );
};
