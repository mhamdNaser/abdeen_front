import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";
import { BiChevronRight } from "react-icons/bi";

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

  const toggleMenu = (id) => {
    setOpenMenus((prevOpenMenus) => {
      const newOpenMenus = Object.keys(prevOpenMenus).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return { ...newOpenMenus, [id]: !prevOpenMenus[id] };
    });
  };

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
            <div
              className="cursor-pointer hover:font-bold flex items-center gap-2"
              onClick={() => toggleMenu(item.id)}
            >
              <div className={`flex w-fit gap-x-2 items-center py-1 px-2`}>
                {language === "ar" ? item.ar_name : item.en_name}
              </div>
            </div>
            {openMenus[item.id] && item.brands && item.brands.length > 0 && (
              <div
                className={`z-30 ${
                  col ? "relative w-full" : "top-14 start-0 absolute"
                } bg-[#3e3e3e] text-white border text-nowrap text-sm border-gray-300 shadow-lg py-4`}
              >
                <h1 className="flex text-white gap-x-3 items-end border-b border-gray-500 py-2 px-8">
                  {(translations && translations["Brands"]) || "Brands"}
                </h1>
                {item.brands.map((brand) => (
                  <li
                    key={brand.id}
                    className="flex hover:bg-[#202020] text-white gap-x-3 items-end py-4  px-10"
                  >
                    <img
                      src={import.meta.env.VITE_WEBSITE_URL + brand.image}
                      alt={brand.en_name}
                      className="max-w-10 min-w-10 min-h-10 max-h-10"
                    />
                    <Link
                      to={`/brand/${brand.id}`}
                      state={{
                        en_name: brand.en_name,
                        ar_name: brand.ar_name,
                      }}
                      className={`flex w-40`}
                    >
                      {language === "ar" ? brand.ar_name : brand.en_name}
                    </Link>
                    <BiChevronRight />
                  </li>
                ))}
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
