import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";

function ListMenu({ col, menuItems }) {
  const { translations, language } = useTranslation();
  const [openMenus, setOpenMenus] = useState({});
  const menuRef = useRef(null); // مرجع للقائمة

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

  const renderMenuItems = (items) => {
    return (
      <ul
        className={`flex gap-x-1 ${
          !col
            ? "flex-row items-start gap-x-1 w-fit justify-start"
            : "absolute flex-col right-0 items-start bg-white text-gray-600 gap-4 py-2 mt-8 w-full"
        }`}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={` ${
              !col ? "relative min-w-40 max-w-fit" : "bg-white w-full"
            }`}
          >
            <div className="cursor-pointer hover:font-bold flex items-center gap-2">
              <div className={`flex w-fit gap-x-2 items-center py-1 px-2`}>
                {item.brands && item.brands.length > 0 ? (
                  <div>{language === "ar" ? item.ar_name : item.en_name}</div>
                ) : (
                  <Link
                    to={`/category/${item.id}`}
                    state={{ en_name: item.en_name, ar_name: item.ar_name }}
                    className={`flex ${!col ? "font-bold" : ""}`}
                  >
                    {language === "ar" ? item.ar_name : item.en_name}
                  </Link>
                )}
              </div>
            </div>
            {item.brands && item.brands.length > 0 && (
              <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
                <h4 className="text-lg font-semibold">{translations.brands}</h4>
                <ul>
                  {item.brands.map((brand) => (
                    <li key={brand.id} className="py-1">
                      {language === "ar" ? brand.ar_name : brand.en_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div ref={menuRef} className={`flex font-serif`}>
      {renderMenuItems(menuItems)}
    </div>
  );
}

export default ListMenu;
