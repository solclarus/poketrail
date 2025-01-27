import { useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FilterFormData } from "@/schemas/filter";

export const useFilter = (searchParams: URLSearchParams, form: UseFormReturn<FilterFormData>) => {
  useEffect(() => {
    const regions = searchParams.get("regions")?.split(",") || [];
    const shapes = searchParams.get("shapes")?.split(",") || [];
    const isImplementeds = searchParams.get("isImplementeds")?.split(",") || [];

    form.setValue("regions", regions);
    form.setValue("shapes", shapes);
    form.setValue("isImplementeds", isImplementeds);
  }, [searchParams, form])
}

