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

import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Filter } from "lucide-react";
import { FilterSchema } from "./schema";
import { shapes, regions } from "./option";
import { useMediaQuery } from "@/hooks/use-media-query";

type FormFields = {
  regions: string[];
  shapes: string[];
};

export const FilterMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [, setSelectedRegions] = useState<string[]>([]);
  const [, setSelectedShapes] = useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      regions: [],
      shapes: [],
    },
  });

  useEffect(() => {
    const regionsParam = searchParams.get("regions");
    const shapesParam = searchParams.get("shapes");
    if (regionsParam) {
      const parsedRegions = regionsParam.split(",");
      setSelectedRegions(parsedRegions);
      form.setValue("regions", parsedRegions);
    }
    if (shapesParam) {
      const parsedShapes = shapesParam.split(",");
      setSelectedShapes(parsedShapes);
      form.setValue("shapes", parsedShapes);
    }
  }, [searchParams, form]);

  useEffect(() => {
    const regionsParam = searchParams.get("regions");
    const shapesParam = searchParams.get("shapes");
    if (regionsParam) {
      const parsedRegions = regionsParam.split(",");
      setSelectedRegions(parsedRegions);
      form.setValue("regions", parsedRegions);
    }
    if (shapesParam) {
      const parsedShapes = shapesParam.split(",");
      setSelectedShapes(parsedShapes);
      form.setValue("shapes", parsedShapes);
    }
  }, [searchParams, form]);

  function onSubmit(data: z.infer<typeof FilterSchema>) {
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

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);

    toast({
      title: "フィルターを適用しました",
    });
  }

  const FilterContent = () => {
    const handleSelectAll = (
      field: ControllerRenderProps<FormFields, keyof FormFields>,
      items: { value: string }[]
    ) => {
      field.onChange(items.map((item) => item.value));
    };

    const handleClearAll = (
      field: ControllerRenderProps<FormFields, keyof FormFields>
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
            name="shapes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  フォルム
                </FormLabel>
                <div className="flex flex-col gap-2 mt-2">
                  {shapes.map((item) => (
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
                    onClick={() => handleSelectAll(field, shapes)}
                  >
                    全選択
                  </Button>
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
        <FilterContent />
      </SheetContent>
    </Sheet>
  ) : (
    <div className="border rounded-md backdrop-blur-sm p-3">
      <FilterContent />
    </div>
  );
};
