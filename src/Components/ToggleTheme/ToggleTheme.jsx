import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full flex items-center gap-2 transition-all duration-300 hover:text-black hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <>
          <FaMoon className="text-gray-700" />
          <span className="hidden  sm:inline">Dark Mode</span>
        </>
      ) : (
        <>
          <FaSun className="text-yellow-400" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      )}
    </button>
  );
};

export default ToggleTheme;
