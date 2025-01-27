import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FilterForm } from "./FilterForm";
import { isImplementeds, regions, shapes } from "./FilterOption";
import { FilterFormData } from "@/schemas";

type FilterAccordionProps = {
  isMobile: boolean;
  onSubmit: (data: FilterFormData) => void;
};

export const FilterAccordion = ({ isMobile, onSubmit }: FilterAccordionProps) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const handleAccordionChange = (value: string) => {
    setOpenAccordions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Accordion
      type="multiple"
      value={openAccordions}
      onValueChange={setOpenAccordions}
      className="w-full"
    >
      <AccordionItem value="regions">
        <AccordionTrigger onClick={() => handleAccordionChange("regions")}>
          地方
        </AccordionTrigger>
        <AccordionContent>
          <FilterForm
            name="regions"
            items={regions}
            isMobile={isMobile}
            onSubmit={onSubmit}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shapes">
        <AccordionTrigger onClick={() => handleAccordionChange("shapes")}>
          フォルム
        </AccordionTrigger>
        <AccordionContent>
          <FilterForm
            name="shapes"
            items={shapes}
            isMobile={isMobile}
            onSubmit={onSubmit}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="isImplementeds">
        <AccordionTrigger
          onClick={() => handleAccordionChange("isImplementeds")}
        >
          実装
        </AccordionTrigger>
        <AccordionContent>
          <FilterForm
            name="isImplementeds"
            items={isImplementeds}
            isMobile={isMobile}
            onSubmit={onSubmit}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
