import React, { useEffect, useState } from "react";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaSquareXTwitter,
} from "react-icons/fa6";
import ProductSection from "../Components/ProductSection";
import BestSalerSection from "../Components/BestSalerSection";
import BestDiscountedSection from "../Components/BestDiscountedSection";
import { useTranslation } from "../../provider/TranslationProvider";
import axiosClient from "../../axios-client";
import { Link, useOutletContext } from "react-router-dom";

export default function Home() {
  const [mode, setMode] = useState(localStorage.getItem("theme"));
  const language = localStorage.getItem("LANGUAGE");
  const [background, setBackground] = useState(true);
  const { translations } = useTranslation();
  const { socialMedia } = useOutletContext();

  useEffect(() => {
    const handleStorageChange = () => {
      setMode(localStorage.getItem("theme"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-[600px] items-center">
        <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-start">
          <div className="flex flex-col lg:flex-row items-center">
            <img src="/image/watches.png" alt="Watches" />
            <div
              className={` ${
                language === "ar" ? "w-fit font-serif" : "w-2/3"
              } py-4 px-8 2xl:block hidden text-primary-text shadow-lg rounded-lg text-center lg:text-center`}
              // style={{ minWidth: "1280px", minHeight: "600px" }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                {(translations && translations["ELEGANCE"]) || "ELEGANCE"}
              </h2>
              <h2 className="text-xl sm:text-2xl my-2">
                {(translations && translations["IN"]) || "IN"}
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                {(translations && translations["TIME"]) || "TIME"}
              </h2>
            </div>
          </div>
        </div>
        <div
          className={` ${language === "ar" ? "font-serif text-white lg:text-redColor" : "text-redColor lg:text-white"}
          flex flex-col w-full lg:w-1/3 m-auto text-center gap-y-4  p-4 lg:p-0`}
        >
          <p className="text-lg sm:text-xl font-semibold">
            {(translations &&
              translations[
                "Discover a diverse collection of the finest watch brands with"
              ]) ||
              "Discover a diverse collection of the finest watch brands with"}
          </p>
          <div className="mt-4 lg:mt-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
              {(translations && translations["ABDEEN"]) || "ABDEEN"}
            </h1>
            <h1 className="text-xl sm:text-2xl">
              {(translations && translations["for"]) || "for"}
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
              {(translations && translations["Watches"]) || "Watches"}
            </h1>
          </div>
          <p className="text-lg sm:text-xl font-semibold">
            {(translations && translations["where luxury and quality meet."]) ||
              "where luxury and quality meet."}
          </p>
          <div className="flex gap-4 mt-6 lg:mt-10 m-auto">
            {socialMedia &&
              socialMedia.map((media) => {
                if (media.title === "facebook") {
                  return (
                    <Link
                      to={`${media.link}`}
                      target="_blank"
                      className="hover:text-black text-white"
                      key={media.title}
                    >
                      <FaSquareFacebook size={32} />
                    </Link>
                  );
                } else if (media.title === "instagram") {
                  return (
                    <Link
                      to={`${media.link}`}
                      target="_blank"
                      className="hover:text-black text-white"
                      key={media.title}
                    >
                      <FaSquareInstagram size={32} />
                    </Link>
                  );
                } else if (media.title === "whatsapp") {
                  return (
                    <Link
                      to={`${media.link}`}
                      target="_blank"
                      className="hover:text-black text-white"
                      key={media.title}
                    >
                      <FaSquareWhatsapp size={32} />
                    </Link>
                  );
                } else {
                  return null; // لتجنب ظهور أي شيء إذا لم يكن العنوان متوافق
                }
              })}
            {/* <button className="hover:text-black text-white">
              <FaSquareXTwitter size={32} />
            </button> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col w-full justify-center items-center bg-blocks-color border-y border-redColor">
          <div className="p-5">
            <BestSalerSection />
          </div>
          <div
            className={`${
              !background
                ? "bg-background-color"
                : "bg-[url('/image/watches12.webp')]"
            } bg-cover bg-center bg-fixed h-[680px] w-full`}
          ></div>
        </div>
        <div className="flex flex-col w-full justify-center items-center bg-blocks-color border-y border-redColor">
          <div className="p-5">
            <BestDiscountedSection />
          </div>
          <div
            className={`${
              !background
                ? "bg-background-color"
                : "bg-[url('/image/watches10.jpg')]"
            } bg-cover bg-center bg-fixed h-[680px] w-full`}
          ></div>
        </div>
        <div className="flex flex-col w-full justify-center items-center bg-blocks-color border-y border-redColor">
          <div className="p-5">
            <ProductSection />
          </div>
          <div
            className={`${
              !background
                ? "bg-background-color"
                : "bg-[url('/image/watches11.jpg')]"
            } bg-cover bg-center bg-fixed h-[680px] w-full`}
          ></div>
        </div>
      </div>
    </>
  );
}
