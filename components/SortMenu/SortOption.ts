import type { Option } from "@/types";

export const sorts: Option[] = [
  { value: "index", label: "図鑑番号" },
  { value: "name", label: "名前" },
  { value: "implemented_date", label: "実装日" },
];

export const orders: Option[] = [
  { value: "asc", label: "昇順" },
  { value: "desc", label: "降順" },
];