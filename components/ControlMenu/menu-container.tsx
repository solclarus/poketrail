import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import { MenuContainerProps } from "@/components/ControlMenu";

export const MenuContainer = <T extends object>({
  title,
  icon,
  form,
  isOpen,
  setIsOpen,
  immediateUpdate,
  onSubmit,
  children,
}: MenuContainerProps<T>) => {
  const content = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
        {!immediateUpdate && (
          <Button type="submit" className="w-full">
            適用
          </Button>
        )}
      </form>
    </Form>
  );

  if (!immediateUpdate) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            {icon}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return content;
};
