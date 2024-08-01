import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";

function ListMenu({ col, menuItems }) {
  const { translations, language } = useTranslation();
  const [openMenus, setOpenMenus] = useState({}); // لتتبع القوائم المفتوحة

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


  // const toggleMenu = (id) => {
  //   setOpenMenus((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // }

  const renderMenuItems = (items, level = 0) => {
    if (level > 10) return null;

    return (
      <ul className="flex gap-x-6">
        {items.map((item) => (
          <li key={item.id} className="relative">
            <div
              onClick={() => toggleMenu(item.id , level)}
              className="cursor-pointer hover:font-bold flex items-center gap-2"
            >
              <div className="flex w-fit gap-x-2 items-center py-1  px-2">
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
                    className={`flex items-center ${
                      level === 0 ? "font-bold" : ""
                    }`}
                  >
                    {language === "ar" ? item.ar_name : item.en_name}
                  </Link>
                ) : (
                  <div>{language === "ar" ? item.ar_name : item.en_name}</div>
                )}
              </div>
              {item.children.length > 0 && (
                <span
                  className={`ml-2 ${openMenus[item.id] ? "rotate-90" : ""}`}
                ></span>
              )}
            </div>
            {item.children.length > 0 && openMenus[item.id] && (
              <div
                className={`absolute ${
                  level === 0 ? "top-full" : "left-full"
                } top-0  mt-4 bg-white text-gray-600 border w-52 text-nowrap text-sm border-gray-300 shadow-lg`}
              >
                <div className="flex bg-[#3e3e3e] text-white gap-x-2  items-center py-2 px-2">
                  <img
                    src={import.meta.env.VITE_WEBSITE_URL + item.image}
                    alt={item.en_name}
                    className="w-8 h-8"
                  />
                  <Link
                    to={`/category/${item.id}`}
                    state={{ en_name: item.en_name, ar_name: item.ar_name }}
                    className={`flex items-center ${
                      level === 0 ? "font-bold" : ""
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
    <div
      className={`flex ${
        !col
          ? "flex-row items-start gap-x-8 w-fit justify-start" // تعديل هنا لتكون القوائم الرئيسية بجانب بعضها
          : "absolute flex-col right-0  items-start bg-white text-gray-600 gap-4 p-6 w-full"
      } font-serif`}
    >
      {renderMenuItems(menuItems)}
    </div>
  );
}

export default ListMenu;

