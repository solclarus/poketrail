import { FilterFormData } from "./filter-schema";

export type FilterOption = {
  value: string;
  label: string;
};

export const filterOptions: Record<keyof FilterFormData, {
  value: keyof FilterFormData;
  label: string;
  items: FilterOption[];
}> = {
  regions: {
    value: "regions",
    label: "地方",
    items: [
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
        { value: "unknown", label: "未確認" }
    ],
  },
  shapes: {
    value: "shapes",
    label: "形態",
    items: [
        { value: "default", label: "通常" },
        { value: "mega", label: "メガシンカ" },
        { value: "gmax", label: "キョダイマックス" },
        ],
          },
          isImplemented: {
            value: "isImplemented",
            label: "実装",
            items: [
              { value: "true", label: "実装済" },
              { value: "false", label: "未実装" },
            ],
          },
        } as const;