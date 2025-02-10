import { UseFormReturn } from "react-hook-form";
import { ReactNode } from "react";

type BaseMenuProps = {
  title: string;
  icon: ReactNode;
  immediateUpdate?: boolean;
};

export type MenuContainerProps<T extends object> = BaseMenuProps & {
  form: UseFormReturn<T>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: T) => void;
  children: ReactNode;
};