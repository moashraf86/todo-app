import { useEffect, useState } from "react";
import { ThemeToggler } from "./ThemeToggler";

/**
 * Header component represents the header of the application.
 */
export const Header = () => {
  // State for controlling dark mode
  const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(storedDarkMode || true);

  // Effect to handle dark mode changes and persist in local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header>
      <div className="flex justify-between items-center mb-10">
        {/* Title of the application */}
        <h1 className="text-[32px] md:text-[64px] font-semibold font-mono uppercase tracking-widest">
          Todo List
        </h1>

        {/* Theme toggler component */}
        <ThemeToggler darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
};
