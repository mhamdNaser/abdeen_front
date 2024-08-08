import React, { useState, useEffect } from "react";
import "../index.css";
import { Link, Outlet } from "react-router-dom";
import MainHeader from "../Site/Components/MainHeader";
import TopHeader from "../Site/Components/TopHeader";
import { useTranslation } from "../provider/TranslationProvider";
import Footer from "../Site/Components/Footer";
import axiosClient from "../axios-client";
import Loading from "./Loading";
import { BiLogoWhatsappSquare } from "react-icons/bi";
import { useCategoryBrand } from "../provider/CategoryBrandProvider";

export default function SiteLayout() {
  const { language } = useTranslation();
  const [background, setBackground] = useState(true);
  const [likeNum, setLikeNum] = useState(0);
  const [cardProductNum, seCardProductNum] = useState(0);
  const [socialMedia, setSocialMedia] = useState([]);
  const { items, brands } = useCategoryBrand();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // إعداد وقت الانتظار هنا بـ 2000 ميلي ثانية (2 ثانية)
  }, []);

  useEffect(() => {
    axiosClient.get("site/socialmedia").then((res) => {
      setSocialMedia(res.data.socialMedia);
    });
  }, []);

  const getLikeNum = () => {
    const existingProducts =
      JSON.parse(localStorage.getItem("Like_products")) || [];
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="menu-dropdown bg-blocks-color h-full relative">
      <TopHeader likeNum={likeNum} cardProductNum={cardProductNum} />
      <MainHeader
        menuItems={items}
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
          items,
          brands,
        }}
      />
      <Footer socialMedia={socialMedia} />
      <Link
        className="fixed bottom-10 right-10 p-4"
        to={"https://wa.me/962776830893"}
        target="_blank"
      >
        <BiLogoWhatsappSquare size={72} className="text-greenColor" />
      </Link>
    </div>
  );
}
