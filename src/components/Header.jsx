import { useEffect, useState } from "react";
import { ThemeToggler } from "./ThemeToggler";
// Code: Header component
export const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header>
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-semibold  font-mono uppercase tracking-widest">
          Todo List
        </h1>
        <ThemeToggler darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
};
