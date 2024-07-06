import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchTranslations } from "../axios-client";

const TranslationContext = createContext();

export default function TranslationProvider({ children }) {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState(
    localStorage.getItem("LANGUAGE") || "en"
  );

  useEffect(() => {
    const loadTranslations = async () => {
      const data = await fetchTranslations(language);
      setTranslations(data);
    };
    loadTranslations();
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("LANGUAGE", lang);
  };

  return (
    <TranslationContext.Provider
      value={{ translations, changeLanguage, language }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => useContext(TranslationContext);
