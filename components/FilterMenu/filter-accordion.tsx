"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FilterForm,
  filterOptions,
  useFilterMenu,
} from "@/components/FilterMenu";

export const FilterAccordion = () => {
  const { openAccordions, handleAccordion } = useFilterMenu();

  return (
    <Accordion type="multiple" value={openAccordions} className="w-full">
      {Object.values(filterOptions).map((option) => {
        return (
          <AccordionItem key={option.value} value={option.value}>
            <AccordionTrigger onClick={() => handleAccordion(option.value)}>
              {option.label}
            </AccordionTrigger>
            <AccordionContent>
              <FilterForm name={option.value} items={option.items} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
