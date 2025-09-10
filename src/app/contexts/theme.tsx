"use client";
import { createContext, useState } from "react";
import { ThemeContextType } from "../types/layout-types";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [theme, setTheme] = useState<string>("light");
  const classNames = [
    inter.className,
    "min-h-screen",
    "bg-white",
    "dark:bg-gray-900",
    "text-gray-900",
    "dark:text-gray-100",
    theme,
  ].join(" ");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <body className={classNames}>{children}</body>
    </ThemeContext.Provider>
  );
};
