import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { Menu } from "@headlessui/react";
import { useTranslation } from "../../provider/TranslationProvider";

export default function ListMenu({ col }) {
  const { translations } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("LANGUAGE"));
  const [menuItems, setItems] = useState([]);

  const getCategory = () => {
    axiosClient.get("/site/menu-categories").then((data) => {
      setItems(data.data.data);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const firstThreeItems = menuItems.slice(0, 3);
  const remainingItems = menuItems.slice(3);

  return (
    <div
      className={`flex ${
        !col
          ? "flex-row items-center gap-x-8 w-fit justify-between "
          : "absolute flex-col right-0 mt-72 items-start bg-white text-gray-500 gap-4 p-6 w-full"
      } font-serif`}
    >
      {firstThreeItems.map((item, index) => (
        <Link
          key={index}
          to="/watches"
          className="hover:text-redColor hover:font-bold"
        >
          {language === "ar" ? item.ar_name : item.en_name}
        </Link>
      ))}

      {remainingItems.length > 0 && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="hover:text-redColor hover:font-bold">
            {(translations && translations["More"]) || "More"}
          </Menu.Button>
          <Menu.Items
            className={`absolute bg-white divide-gray-100 ${
              !col
                ? "right-0 mt-2 w-56 origin-top-right  divide-y  rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                : "left-20 top-[-12px] min-w-screen py-2"
            } `}
          >
            {remainingItems.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    to="/watches"
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block px-4 py-2 text-sm`}
                  >
                    {language === "ar" ? item.ar_name : item.en_name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      )}
    </div>
  );
}