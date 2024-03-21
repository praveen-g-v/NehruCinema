import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme()); // Function to get default theme

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme); // Persist theme in localStorage
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

function getInitialTheme() {
  const storedTheme = localStorage.getItem("theme");
  return (
    storedTheme ||
    (window.matchMedia("(prefers-color: dark)").matches ? "dark" : "light")
  ); // Respect system preference as a fallback
}
