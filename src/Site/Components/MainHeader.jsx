import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BiSolidCart,
  BiSolidUserCircle,
  BiSolidBrightness,
  BiSolidBrightnessHalf,
} from "react-icons/bi";
import Button from "../../components/Button";
import axios from "axios";
import axiosClient from "../../axios-client";
import { useTranslation } from "../../provider/TranslationProvider";
import { useTWThemeContext } from "../../provider/ThemeProvider";
import LanguageDropdown from "../../components/LanguageDropdown";

export default function MainHeader() {
  const { setTheme } = useTWThemeContext();
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode ? savedMode : "light";
  });
  const { translations, language } = useTranslation();
  const [showmenu, setShowmenu] = useState(false);
  const [menuItems, setItems] = useState([]);
  const itemCount = 25;
  const getCategory = () => {
    axiosClient.get("/site/menu-categories").then((data) => {
      setItems(data.data.data);
    });
  };

  window.onscroll = function () {
    var navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
      navbar.classList.add("bg-white");
      navbar.classList.remove("text-white");
      navbar.classList.remove("shadow-none");
      navbar.classList.add("text-primary-text");
      navbar.classList.add("shadow-sm");
      navbar.classList.add("shadow-redColor");
    } else {
      navbar.classList.remove("bg-white");
      navbar.classList.remove("text-primary-text");
      navbar.classList.remove("shadow-sm");
      navbar.classList.remove("shadow-redColor");
      navbar.classList.add("text-white");
    }
  };

  const getshowmenu = () => {
    setShowmenu(!showmenu);
  };

  const handleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    getCategory();
  }, []);

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
    <div
      id="navbar"
      className="w-full flex justify-between font-extrabold z-50 shadow-none h-auto text-white px-6 sticky top-0 bg-transparent"
    >
      <div className="flex w-full">
        <div className="relative flex items-center w-1/2 justify-between p-6">
          {mode === "light" ? (
            <img
              src="/image/logo.png"
              alt="Logo"
              className="w-1/4 max-w-[200px]"
            />
          ) : (
            <img
              src="/image/logo-dark.png"
              alt="Logo"
              className="w-1/4 max-w-[200px]"
            />
          )}
        </div>

        <div className="relative flex items-center w-1/2 justify-between p-6">
          <div className="flex  items-center justify-between w-1/3 space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to="/watches"
                className="hover:text-redColor hover:font-bold"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-6 px-4">
            <LanguageDropdown />
            <div className="relative">
              <BiSolidCart size={32} className="text-redColor" />
              {itemCount > 0 && (
                <div className="absolute top-[-5px] -left-2 w-4 h-4 rounded-full bg-redColor text-white text-xs flex items-center justify-center">
                  {itemCount}
                </div>
              )}
            </div>
            <button onClick={handleMode}>
              {mode === "light" ? (
                <BiSolidBrightness size={32} className="text-redColor" />
              ) : (
                <BiSolidBrightnessHalf size={32} className="text-redColor" />
              )}
            </button>
            <button onClick={getshowmenu}>
              <BiSolidUserCircle size={32} className="text-redColor" />
            </button>
            <div
              className={`absolute flex flex-col mt-[60px] w-[240px] overflow-y-auto ms-[100px] component-shadow bg-blocks-color z-10 rounded-md ${
                showmenu ? "h-[auto]" : "h-0"
              }`}
            >
              <Link className="font-bold ps-6 py-2 hover:bg-background-color transition-all duration-400 ease-in-out">
                {translations?.Edit_Profile || "Edit Profile"}
              </Link>
              <Link className="font-bold ps-6 py-2 hover:bg-background-color transition-all duration-400 ease-in-out">
                {translations?.Password_Change || "Password Change"}
              </Link>
              <Link
                // onClick={handleLogout}
                className="font-bold ps-6 py-2 hover:bg-background-color transition-all duration-400 ease-in-out"
              >
                {translations?.Logout || "Logout"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
