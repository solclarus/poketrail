export const sortOptions = {
    sort: {
      value: "sort",
      label: "順",
      items: [
        { value: "index", label: "図鑑番号" },
        { value: "name", label: "名前" },
        { value: "implemented_date", label: "実装日" },
      ],
    },
    order: {
      value: "order",
      label: "並び",
      items: [
        { value: "asc", label: "昇順" },
        { value: "desc", label: "降順" },
      ],
    },
  } as const;