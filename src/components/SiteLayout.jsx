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
import { IoMdCloseCircle } from "react-icons/io";
import { useCategoryBrand } from "../provider/CategoryBrandProvider";
import { AnimatePresence, motion } from "framer-motion";
import SiteViewproduct from "../Site/Pages/SiteViewProduct";

export default function SiteLayout() {
  const { language } = useTranslation();
  const [background, setBackground] = useState(true);
  const [likeNum, setLikeNum] = useState(0);
  const [cardProductNum, seCardProductNum] = useState(0);
  const [socialMedia, setSocialMedia] = useState([]);
  const { items, brands } = useCategoryBrand();
  const [loading, setLoading] = useState(true);
  const [productView, setProductView] = useState(false);
  const [productdetails, setProductDetails] = useState({
    id: 0,
    name: "",
  });

  const [images, setImages] = useState({
    primary_image_1: "",
    secondary_image_1: "",
    secondary_image_2: "",
  });

  const fetchImages = async () => {
    const response = await axiosClient.get("site/images/info");
    if (response.data) {
      setImages({
        primary_image_1: response.data.primary_image_1 || "",
        secondary_image_1: response.data.secondary_image_1 || "",
        secondary_image_2: response.data.secondary_image_2 || "",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
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
      <TopHeader socialMedia={socialMedia} />
      <MainHeader
        setProductView={setProductView}
        productdetails={productdetails}
        setProductDetails={setProductDetails}
        menuItems={items}
        background={background}
        likeNum={likeNum}
        cardProductNum={cardProductNum}
      />
      <Outlet
        context={{
          setProductView,
          productdetails,
          setProductDetails,
          images,
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
      <button
        className="fixed bottom-10 right-10 p-4"
        onClick={() => setProductView(true)}
        target="_blank"
      >
        <BiLogoWhatsappSquare size={72} className="text-greenColor" />
      </button>
      {productView && (
        <div className="absolute">
          <AnimatePresence>
            <motion.div
              key="modal-content"
              initial={{ x: "-100%" }}
              animate={{ x: "0" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, type: "spring" }}
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                height: "100%",
                minWidth: "33%",
                maxWidth: "100%",
                zIndex: "102",
              }}
              className="overflow-hidden overflow-y-auto xl:w-1/3 w-full bg-[#3e3e3e]"
            >
              <div
                className={"right-5 absolute top-5 cursor-pointer text-white"}
                onClick={() => setProductView(false)}
              >
                <IoMdCloseCircle size={40} />
              </div>
              <SiteViewproduct
                productdetails={productdetails}
                getCardProductNum={getCardProductNum}
              />
            </motion.div>

            <div
              key="modal-backdrop"
              onClick={() => setProductView(false)}
              className={`fixed cursor-pointer inset-0 bg-[#6b6868a9] w-full h-full z-[100]`}
            ></div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
