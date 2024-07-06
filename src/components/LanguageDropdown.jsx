import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useTranslation } from "../provider/TranslationProvider";

const LanguageDropdown = () => {
  const { translations } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("LANGUAGE") || "en"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("LANGUAGE", language);
    axiosClient.defaults.headers["X-Language"] = language;
  }, [language]);

  const handleChangeLanguage = (lang) => {
    setLanguage(lang);
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative px-4">
      {" "}
      {/* Adjusted width here */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="block w-full px-5 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <span className="flex items-center gap-2">
          <img
            src={`/image/${language}.png`}
            alt={`${language} flag`}
            className="w-8 h-5 mr-2"
          />
          {language == "en" ? translations.English : translations.Arabic}
        </span>
      </button>
      {dropdownOpen && (
        <div className="absolute mt-1 w-full shadow-lg z-10bg-blocks-color">
          <div
            className="flex items-center gap-2 py-2 cursor-pointerbg-blocks-color hover:bg-gray-400 px-2"
            onClick={() => handleChangeLanguage("en")}
          >
            <img
              src="/image/en.png"
              alt="English flag"
              className="w-8 h-5 mr-2"
            />
            <span>{translations.English || "English"}</span>
          </div>
          <div
            className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-400 px-2"
            onClick={() => handleChangeLanguage("ar")}
          >
            <img
              src="/image/ar.png"
              alt="Arabic flag"
              className="w-8 h-5 mr-2"
            />
            <span>{translations.Arabic || "Arabic"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
