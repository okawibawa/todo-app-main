import { useState, useEffect } from "react";
import { ThemeType } from "../types/todo.ts";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("dark");

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    document.body.classList.toggle("dark");
  }, [currentTheme]);

  return { currentTheme, toggleTheme };
};
