import React, { useState, useEffect } from "react";
import useTimeDate from "../../hooks/useTimeDate";
import LanguageDropdown from "../../components/LanguageDropdown";
import Searchmenu from "./Searchmenu";
import { useTranslation } from "../../provider/TranslationProvider";
import { useTWThemeContext } from "../../provider/ThemeProvider";
import { Link } from "react-router-dom";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { useCompanyInfo } from "../../provider/CompanyInfoProvider";

export default function TopHeader({ socialMedia }) {
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
        <span className="font-semibold px-3">{date.toLocaleDateString()}</span>
        <span className="font-semibold">{date.toLocaleTimeString()}</span>
      </div>
      <div className="flex flex-row-reverse gap-x-8 items-center">
        <LanguageDropdown />
        <div className="flex gap-2">
          {socialMedia &&
            socialMedia.map((media) => {
              if (media.title === "facebook") {
                return (
                  <Link
                    to={`${media.link}`}
                    target="_blank"
                    className="hover:text-black text-[#3e3e3e]"
                    key={media.title}
                  >
                    <FaSquareFacebook size={28} />
                  </Link>
                );
              } else if (media.title === "instagram") {
                return (
                  <Link
                    to={`${media.link}`}
                    target="_blank"
                    className="hover:text-black text-[#3e3e3e]"
                    key={media.title}
                  >
                    <FaSquareInstagram size={28} />
                  </Link>
                );
              } else if (media.title === "whatsapp") {
                return (
                  <Link
                    to={`${media.link}`}
                    target="_blank"
                    className="hover:text-black text-[#3e3e3e]"
                    key={media.title}
                  >
                    <FaSquareWhatsapp size={28} />
                  </Link>
                );
              } else {
                return null;
              }
            })}
        </div>
      </div>
    </div>
  );
}
