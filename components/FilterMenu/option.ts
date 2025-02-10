import { FilterFormData } from "./schema";

export type FilterOption = {
  value: string;
  label: string;
};

export const regions: FilterOption[] = [
  { value: "kanto", label: "カントー" },
  { value: "johto", label: "ジョウト" },
  { value: "hoenn", label: "ホウエン" },
  { value: "sinnoh", label: "シンオウ" },
  { value: "unova", label: "イッシュ" },
  { value: "kalos", label: "カロス" },
  { value: "alola", label: "アローラ" },
  { value: "galar", label: "ガラル" },
  { value: "hisui", label: "ヒスイ" },
  { value: "paldea", label: "パルデア" },
  { value: "unknown", label: "未確認" },
];

export const shapes: FilterOption[] = [
  { value: "default", label: "通常" },
  { value: "mega", label: "メガシンカ" },
  { value: "gmax", label: "キョダイマックス" },
];

export const isImplemented: FilterOption[] = [
  { value: "true", label: "実装済" },
  { value: "false", label: "未実装" },
];

type FilterItem = {
  value: keyof FilterFormData;
  label: string;
  items: FilterOption[];
};

export const filterOptions: Record<keyof FilterFormData, FilterItem> = {
  regions: {
    value: "regions",
    label: "地方",
    items: regions,
  },
  shapes: {
    value: "shapes",
    label: "形態",
    items: shapes,
  },
  isImplemented: {
    value: "isImplemented",
    label: "実装",
    items: isImplemented,
  },
} as const;
