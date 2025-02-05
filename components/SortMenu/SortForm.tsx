import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sorts, orders } from "./SortOption";
import { SortFormData } from "@/schemas";

type SortFormProps = {
  isMobile: boolean;
  onSubmit: (data: SortFormData) => void;
};

export const SortForm = ({ isMobile, onSubmit }: SortFormProps) => {
  const form = useFormContext<SortFormData>();

  const handleChange = () => {
    if (!isMobile) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="sort"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleChange();
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sorts.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="order"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  handleChange();
                }}
                value={field.value}
                className="flex space-x-4"
              >
                {orders.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-center space-x-2 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
