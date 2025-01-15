"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme === "dark" ? "light" : "dark";
    setTheme(currentTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="shrink-0"
    >
      {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
};
