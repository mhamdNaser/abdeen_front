import React, { useEffect, useState } from "react";
import ProductSection from "../Components/ProductSection";
import BestSalerSection from "../Components/BestSalerSection";
import BestDiscountedSection from "../Components/BestDiscountedSection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/virtual";
import "swiper/css/effect-cards";
import {
  EffectCoverflow,
  Pagination,
  Virtual,
  EffectCards,
} from "swiper/modules";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";

export default function Home() {
  const [mode, setMode] = useState(localStorage.getItem("theme"));
  const { images, brands } = useOutletContext();
  const [background, setBackground] = useState(true);
  const { language } = useTranslation();

  useEffect(() => {
    const handleStorageChange = () => {
      setMode(localStorage.getItem("theme"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* swiper for large screen */}
      <div
        className="lg:flex hidden flex-col xl:w-[80%] h-[430px] my-10 mx-auto py-12 w-full gap-x-8 items-center"
        dir="ltr"
      >
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          initialSlide={1}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Virtual]}
          className="mySwiper"
          Virtual
        >
          <SwiperSlide key={1}>
            <img
              src={import.meta.env.VITE_WEBSITE_URL + images.primary_image_1}
              alt="Primary Image 1"
              className="xl:w-[620px] w-full xl:h-[620px]"
            />
          </SwiperSlide>
          <SwiperSlide key={2}>
            <img
              src={import.meta.env.VITE_WEBSITE_URL + images.secondary_image_2}
              alt="Primary Image 3"
              className="xl:w-[620px] w-full h-[620px]"
            />
          </SwiperSlide>
          <SwiperSlide key={3}>
            <img
              src={import.meta.env.VITE_WEBSITE_URL + images.secondary_image_1}
              alt="Secondary Image 2"
              className="xl:w-[620px] w-full h-[620px]"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* swiper for small screen */}
      <div
        className="flex lg:hidden flex-col xl:w-[80%] h-[460px] mx-auto p-12 w-full gap-x-8 items-center"
        dir="ltr"
      >
        <Swiper
          effect={"cards"}
          grabCursor={true}
          initialSlide={1}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide key={1}>
            <img
              src={import.meta.env.VITE_WEBSITE_URL + images.primary_image_1}
              alt="Primary Image 1"
              className="xl:w-[620px] w-full xl:h-[620px]"
            />
          </SwiperSlide>
          <SwiperSlide key={2}>
            <img
              src={import.meta.env.VITE_WEBSITE_URL + images.secondary_image_2}
              alt="Primary Image 3"
              className="xl:w-[620px] w-full h-[620px]"
            />
          </SwiperSlide>
          <SwiperSlide key={3}>
            <img
              src={import.meta.env.VITE_WEBSITE_URL + images.secondary_image_1}
              alt="Secondary Image 2"
              className="xl:w-[620px] w-full h-[620px]"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* brand view */}
      <div className="w-full bg-[#3e3e3e]">
        <div className="w-[60%] m-auto py-8 px-6 items-center">
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            breakpoints={{
              412: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1420: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="h-40 p-2 relative">
                  <img
                    src={import.meta.env.VITE_WEBSITE_URL + brand.image}
                    alt={brand.en_name}
                    width={"10%"}
                    height={"10%"}
                  />
                  <div className="absolute bg-[#3e3e3e] bg-opacity-90 bottom-0 left-0 w-full border text-white p-2">
                    {language === "ar" ? brand.ar_name : brand.en_name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* product sections */}
      <div className="flex flex-col">
        <div className="flex flex-col w-full justify-center items-center bg-blocks-color border-y border-redColor">
          <div className="w-full p-5">
            <BestSalerSection />
          </div>
          <div
            className={`${
              !background
                ? "bg-background-color"
                : "bg-[url('/image/watches12.webp')]"
            } bg-cover bg-center bg-fixed h-[420px] w-full`}
          ></div>
        </div>
        <div className="flex flex-col w-full justify-center items-center bg-blocks-color border-y border-redColor">
          <div className="w-full p-5">
            <BestDiscountedSection />
          </div>
          <div
            className={`${
              !background
                ? "bg-background-color"
                : "bg-[url('/image/watches10.jpg')]"
            } bg-cover bg-center bg-fixed h-[420px] w-full`}
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
            } bg-cover bg-center bg-fixed h-[420px] w-full`}
          ></div>
        </div>
      </div>
    </>
  );
}
