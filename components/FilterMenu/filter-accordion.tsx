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
  FilterFormData,
  useFilterMenu,
} from "@/components/FilterMenu";

type FilterAccordionProps = {
  isMobile: boolean;
  onSubmit: (data: FilterFormData) => void;
};

export const FilterAccordion = ({
  isMobile,
  onSubmit,
}: FilterAccordionProps) => {
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
              <FilterForm
                name={option.value}
                items={option.items}
                isMobile={isMobile}
                onSubmit={onSubmit}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
