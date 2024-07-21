import React from "react";
import { useTranslation } from "../../provider/TranslationProvider";
import { BsHddStackFill, BsGridFill } from "react-icons/bs";

export default function SitePageTitle({ entitle, artitle, number, getHorValue }) {
  const { translations, language } = useTranslation();
  return (
    <div className="flex text-start w-full text-primary">
      <div className="flex flex-col text-md w-full">
        <div className="py-2 w-full text-2xl font-bold">
          {language === "ar" ? artitle : entitle}
        </div>
        <div className="border-t flex items-center justify-between w-full border-b border-gray-200 py-4 text-sm">
          {number} {(translations && translations["Products"]) || "Products"}
          <div className="flex items-center gap-3">
            <button onClick={() => getHorValue(true)}>
              <BsHddStackFill />
            </button>
            <button onClick={() => getHorValue(false)}>
              <BsGridFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
