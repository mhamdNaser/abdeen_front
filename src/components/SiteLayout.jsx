import React, { useState, useEffect } from "react";
import "../index.css";
import { Outlet } from "react-router-dom";
import MainHeader from "../Site/Components/MainHeader";
import TopHeader from "../Site/Components/TopHeader";
import { useTranslation } from "../provider/TranslationProvider";
import Footer from "../Site/Components/Footer";
import axiosClient from "../axios-client";

export default function SiteLayout() {
  // const language = localStorage.getItem("LANGUAGE");
  const { language, changeLanguage } = useTranslation();
  const [background, setBackground] = useState(true);
  const [likeNum, setLikeNum] = useState(0);
  const [cardProductNum, seCardProductNum] = useState(0);
  const [socialMedia, setSocialMedia] = useState([]);
  const [menuItems, setItems] = useState([]);

  const getCategory = () => {
    axiosClient.get("/site/menu-categories").then((data) => {
      setItems(data.data.data);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    axiosClient.get("site/socialmedia").then((res) => {
      setSocialMedia(res.data.socialMedia);
    });
  }, []);

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
    <div className="menu-dropdown bg-blocks-color h-full">
      <TopHeader likeNum={likeNum} cardProductNum={cardProductNum} />
      <div
        className={`${!background
            ? "bg-background-color"
            : language == "ar"
              ? "bg-[url('/image/background-rtl.png')]"
              : "bg-[url('/image/background.png')]"
          } bg-cover bg-fixed max-fit`}
      >
        <MainHeader
          menuItems={menuItems}
          background={background}
          likeNum={likeNum}
          cardProductNum={cardProductNum}
        />
        <Outlet
          context={{
            socialMedia,
            setBackground,
            getLikeNum,
            getCardProductNum,
          }}
        />
        <Footer socialMedia={socialMedia} />
      </div>
    </div>
  );
}
