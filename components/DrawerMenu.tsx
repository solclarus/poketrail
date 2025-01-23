"use client";

import { AppConfig } from "@/app.config";
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
import { useState } from "react";

export const DrawerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{AppConfig.title}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col space-y-2 px-4">
          <Button variant={"link"} asChild>
            <Link href={"/"}>HOME</Link>
          </Button>
          <Button variant={"link"} asChild>
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
