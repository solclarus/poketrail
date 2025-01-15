"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Link from "next/link";

export const DrawerDemo = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>GOWANTED</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col space-y-1 px-4">
          <Button variant={"secondary"} asChild>
            <Link href={"/"}>HOME</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href={"/history"}>HISTORY</Link>
          </Button>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
