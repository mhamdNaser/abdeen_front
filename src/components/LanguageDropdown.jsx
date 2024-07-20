import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useTranslation } from "../provider/TranslationProvider";
import { FaLanguage } from "react-icons/fa";

const LanguageDropdown = () => {
  const { translations, changeLanguage } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem("LANGUAGE") || "en"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getData = async () => {
    await axiosClient.get("/site/active-languages").then((res) => {
      setLanguages(res.data.data);
    });
  };

  useEffect(() => {
    getData();
    localStorage.setItem("LANGUAGE", language);
    axiosClient.defaults.headers["X-Language"] = language;
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        !document.querySelector(".menu-dropdown").contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleChangeLanguage = (lang) => {
    setLanguage(lang);
    setDropdownOpen(false);
    changeLanguage(lang);
  };

  return (
    <div className="px-4">
      {" "}
      {/* Adjusted width here */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="block w-full px-3 py-1 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        <span className="flex items-center gap-2">
          <FaLanguage className="w-6 h-4 mr-2" />
          {language.toUpperCase()}
        </span>
      </button>
      {dropdownOpen && (
        <div className="absolute mt-1 shadow-lg  z-50 text-primary-text  bg-blocks-color">
          {languages.map((value, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-2 cursor-pointerbg-blocks-color hover:bg-gray-400 px-2"
              onClick={() => handleChangeLanguage(value.slug)}
            >
              <FaLanguage className="w-8 h-5 mr-2" />
              <span>{value.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
