import { SortFormData } from "./schema";

export type SortOption = {
  value: string;
  label: string;
};
export const sorts: SortOption[] = [
  { value: "index", label: "図鑑番号" },
  { value: "name", label: "名前" },
  { value: "implemented_date", label: "実装日" },
];

export const orders: SortOption[] = [
  { value: "asc", label: "昇順" },
  { value: "desc", label: "降順" },
];

type SortItem = {
  value: keyof SortFormData;
  label: string;
  items: SortOption[];
};

export const sortOptions: Record<keyof SortFormData, SortItem> = {
  order: {
    value: "order",
    label: "並び",
    items: orders,
  },
  sort: {
    value: "sort",
    label: "順",
    items: sorts,
  },
} as const;
