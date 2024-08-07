import React, { useState, useEffect } from "react";
import useTimeDate from "../../hooks/useTimeDate";
import LanguageDropdown from "../../components/LanguageDropdown";
import Searchmenu from "./Searchmenu";
import { useTranslation } from "../../provider/TranslationProvider";
import { useTWThemeContext } from "../../provider/ThemeProvider";

export default function TopHeader() {
  const date = useTimeDate();
  const { language } = useTranslation();
  const { setTheme } = useTWThemeContext();
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode ? savedMode : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
    const htmlElement = document.querySelector("html");
    localStorage.setItem("theme", mode);
    setTheme(mode);
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", mode);
      sessionStorage.setItem("mode", mode);
    }
  }, [mode]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (language === "ar") {
        htmlElement.setAttribute("dir", "rtl");
      } else {
        htmlElement.setAttribute("dir", "ltr");
      }
    }
  }, [language]);

  return (
    <div className="w-full z-40 flex flex-row justify-between xl:px-36 px-6 py-3 text-[#3e3e3e] bg-gray-100 text-[12px]">
      <div className="flex justify-between items-center">
        <span className="font-semibold px-3">
          {date.toLocaleDateString()}
        </span>
        <span className="font-semibold">{date.toLocaleTimeString()}</span>
      </div>
      <div className="flex flex-row-reverse">
        <LanguageDropdown />
        {/* <Searchmenu /> */}
      </div>
    </div>
  );
}
