export type Region = {value:string, label: string};
type Form = {value:string, label: string};

export const regions: Region[] = [
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
  
 export const forms: Form[] = [
    { value: "default", label: "通常" },
    { value: "mega", label: "メガシンカ" },
    { value: "gmax", label: "キョダイマックス" },
  ];