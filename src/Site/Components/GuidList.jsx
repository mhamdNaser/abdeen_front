import React, { useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { useTranslation } from "../../provider/TranslationProvider";
import { Link } from "react-router-dom";

export default function GuidList({ setLoginModalOpen, setSingupModalOpen
  
 }) {
  const [showmenu, setShowmenu] = useState(false);
  const { translations, language } = useTranslation();

  const getshowmenu = () => {
    setShowmenu(!showmenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showmenu &&
        !document.querySelector(".menu-dropdown").contains(event.target)
      ) {
        setShowmenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showmenu]);

  return (
    <>
      <button onClick={getshowmenu} className="xl:text-white text-gray-400">
        <BiSolidUserCircle size={32} />
      </button>
      <div
        className={`absolute flex flex-col xl:mt-[40px] mt-[160px] min-w-[160px] overflow-y-auto end-0 component-shadow text-primary-text bg-blocks-color rounded-md ${
          showmenu ? "h-[auto]" : "h-0"
        }`}
      >
        <button
          onClick={() => {
            setLoginModalOpen(true);
          }}
          className="font-bold px-6 py-2 hover:bg-background-color transition-all duration-400 ease-in-out"
        >
          {translations?.Login || "Login"}
        </button>
        <button
          onClick={() => {
            setSingupModalOpen(true);
          }}
          className="font-bold px-6 py-2 hover:bg-background-color transition-all duration-400 ease-in-out"
        >
          {translations?.Singup || "Singup"}
        </button>
      </div>
    </>
  );
}
