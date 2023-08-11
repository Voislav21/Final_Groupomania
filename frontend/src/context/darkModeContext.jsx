import { createContext, useEffect, useState } from "react";

// Create a new context for managing dark mode state and functions
export const DarkModeContext = createContext();

// Define the context provider component
export const DarkModeContextProvider = ({ children }) => {
  // State to store the dark mode status
  const [darkMode, setDarkMode] = useState (
    JSON.parse (localStorage.getItem("darkMode")) || false
  );

  // Function to toggle dark mode
  const toggle = () => {
    setDarkMode(!darkMode);
  };

  // UseEffect to keep local storage and darkMode state in sync
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Provide the dark mode context to child components
  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};