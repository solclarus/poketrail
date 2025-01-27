import type { Option } from "@/types";

export const regions: Option[] = [
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
  
 export const shapes: Option[] = [
    { value: "default", label: "通常" },
    { value: "mega", label: "メガシンカ" },
    { value: "gmax", label: "キョダイマックス" },
  ];

 export const isImplementeds: Option[] = [
    { value: "true", label: "実装済" },
    { value: "false", label: "未実装" },
  ];
