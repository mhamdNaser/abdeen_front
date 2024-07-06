import { createContext, useContext, useState } from "react";
const TWThemeContext = createContext();
export const TWThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  return (
    <TWThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </TWThemeContext.Provider>
  );
};

export const useTWThemeContext = () => useContext(TWThemeContext);
