import Link from "next/link";
import { DrawerMenu } from "./DrawerMenu";
import { ThemeButton } from "./ThemeButton";
import { Button } from "@/components/ui/button";
import { AppConfig } from "@/app.config";

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between px-6 sticky top-0 bg-background z-50 border-b">
      <Button variant={"ghost"} className="text-xl font-bold" asChild>
        <Link href={"/"}>{AppConfig.title}</Link>
      </Button>
      <div className="flex">
        <div className="hidden md:flex">
          <Button variant={"link"} asChild>
            <Link href={"/history"}>HISTORY</Link>
          </Button>
        </div>
        <ThemeButton />
        <div className="md:hidden">
          <DrawerMenu />
        </div>
      </div>
    </header>
  );
};
