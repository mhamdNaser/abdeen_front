import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";

function ListMenu({ col, menuItems }) {
  const { translations, language } = useTranslation();
  const [openMenus, setOpenMenus] = useState({});
  const menuRef = useRef(null);

  const toggleMenu = (id, level) => {
    setOpenMenus((prev) => {
      const newOpenMenus = Object.keys(prev).reduce((acc, key) => {
        const keyLevel = key.split("-").length - 1;
        if (keyLevel === level) {
          acc[key] = false;
        } else {
          acc[key] = prev[key];
        }
        return acc;
      }, {});

      return {
        ...newOpenMenus,
        [id]: !prev[id],
      };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenus({});
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderMenuItems = (items, level = 0) => {
    if (level > 10) return null;

    return (
      <ul
        className={`flex gap-x-6 ${
          !col
            ? "flex-row items-start gap-x-8 w-fit justify-start"
            : level !== 0
            ? "bg-white w-full"
            : "absolute flex-col right-0 items-start bg-white text-gray-600 gap-4 py-2 mt-8 w-full"
        }`}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={`${
              !col
                ? level !== 0
                  ? "relative min-w-52 max-w-fit"
                  : "relative"
                : "bg-white w-full"
            }`}
          >
            <div
              onClick={() => toggleMenu(item.id, level)}
              className="cursor-pointer hover:font-bold flex items-center gap-2"
            >
              <div className="flex w-fit gap-x-2 items-center py-1 px-2">
                {level > 0 && (
                  <img
                    src={import.meta.env.VITE_WEBSITE_URL + item.image}
                    alt={item.en_name}
                    className="w-8 h-8"
                  />
                )}
                {item.children.length === 0 ? (
                  <Link
                    to={`/category/${item.id}`}
                    state={{ en_name: item.en_name, ar_name: item.ar_name }}
                    className={`flex ${level === 0 ? "font-bold" : ""}`}
                  >
                    {language === "ar" ? item.ar_name : item.en_name}
                  </Link>
                ) : (
                  <div>{language === "ar" ? item.ar_name : item.en_name}</div>
                )}
              </div>
              {item.children.length > 0 && (
                <div
                  className={`ml-2 ${openMenus[item.id] ? "rotate-90" : ""}`}
                ></div>
              )}
            </div>
            {item.children.length > 0 && openMenus[item.id] && (
              <div
                className={`z-30 ${
                  col
                    ? "relative w-full"
                    : level === 0
                    ? "top-full mt-4 absolute"
                    : "top-0 start-full absolute"
                } bg-white text-gray-600 border text-nowrap text-sm border-gray-300 shadow-lg`}
              >
                <div className="flex bg-[#3e3e3e] text-white gap-x-2 items-center py-2 px-2">
                  <img
                    src={import.meta.env.VITE_WEBSITE_URL + item.image}
                    alt={item.en_name}
                    className="w-8 h-8"
                  />
                  <Link
                    to={`/category/${item.id}`}
                    state={{ en_name: item.en_name, ar_name: item.ar_name }}
                    className={`flex items-center ${
                      level === 0 ? "font-bold" : "w-40"
                    }`}
                  >
                    {language === "ar" ? item.ar_name : item.en_name}
                  </Link>
                </div>
                <div className="text-nowrap">
                  {renderMenuItems(item.children, level + 1)}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div ref={menuRef} className="flex font-serif">
      {renderMenuItems(menuItems)}
    </div>
  );
}

export default ListMenu;
