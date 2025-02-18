import { useState, useEffect } from "react";
import { ThemeType } from "../types/todo.ts";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("dark");

  const toggleTheme = () => {
    setCurrentTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";

      sessionStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  useEffect(() => {
    const storedTheme = sessionStorage.getItem("theme");

    if (storedTheme && storedTheme !== currentTheme) {
      setCurrentTheme(storedTheme as "dark" | "light");
    }
  }, []);

  useEffect(() => {
    if (currentTheme === "dark") {
      document.body.classList.add("dark");
    }

    if (currentTheme === "light") {
      document.body.classList.remove("dark");
    }

    sessionStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return { currentTheme, toggleTheme };
};
