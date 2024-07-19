import React, { useState, useEffect } from "react";
import "../index.css";
import { Outlet } from "react-router-dom";
import MainHeader from "../Site/Components/MainHeader";
import TopHeader from "../Site/Components/TopHeader";
import { useTranslation } from "../provider/TranslationProvider";
import Footer from "../Site/Components/Footer";

export default function SiteLayout() {
  const language = localStorage.getItem("LANGUAGE");
  const [background, setBackground] = useState(true);
  const [likeNum, setLikeNum] = useState(0);
  const [cardProductNum, seCardProductNum] = useState(0);

  const getLikeNum = () => {
    const existingProducts = JSON.parse(localStorage.getItem("Like_products")) || [];
    setLikeNum(existingProducts.length);
  };

  const getCardProductNum = () => {
    const cardsProducts =
      JSON.parse(localStorage.getItem("Card_products")) || [];
    seCardProductNum(cardsProducts.length);
  };

  useEffect(() => {
    getLikeNum();
    getCardProductNum();
  }, []);

  return (
    <div className="bg-blocks-color h-full">
      <TopHeader />
      <div
        className={`${
          !background
            ? "bg-background-color"
            : language == "ar"
            ? "bg-[url('/image/background-rtl.png')]"
            : "bg-[url('/image/background.png')]"
        } bg-cover bg-fixed max-fit`}
      >
        <MainHeader
          background={background}
          likeNum={likeNum}
          cardProductNum={cardProductNum}
        />
        <Outlet context={{ setBackground, getLikeNum, getCardProductNum }} />
        <Footer />
      </div>
    </div>
  );
}
