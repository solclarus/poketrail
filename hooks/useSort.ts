import { SortFormData } from "@/schemas"
import { useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"

export const useSort = (searchParams: URLSearchParams, form: UseFormReturn<SortFormData>) => {
  useEffect(() => {
    const sort = searchParams.get("sort")
    const order = searchParams.get("order")

    if (sort && (sort === "index" || sort === "name" || sort === "implemented_date")) {
      form.setValue("sort", sort)
    } else {
      form.setValue("sort", "index")
    }

    if (order && (order === "asc" || order === "desc")) {
      form.setValue("order", order)
    } else {
      form.setValue("order", "asc")
    }
  }, [searchParams, form])
}

