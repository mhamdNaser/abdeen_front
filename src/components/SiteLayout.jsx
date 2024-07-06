import React from "react";
import "../index.css";
import { Outlet } from "react-router-dom";
import MainHeader from "../Site/Components/MainHeader";
import TopHeader from "../Site/Components/TopHeader";
import { useTranslation } from "../provider/TranslationProvider";

export default function SiteLayout() {
  const language = localStorage.getItem("LANGUAGE");
  return (
    <div className="bg-blocks-color h-full">
      <TopHeader />
      <div
        className={`${
          language == "ar"
            ? "bg-[url('/image/background-rtl.png')]"
            : "bg-[url('/image/background.png')]"
        } bg-cover bg-fixed max-h-screen`}
      >
        <MainHeader />
        <Outlet />
      </div>
    </div>
  );
}
