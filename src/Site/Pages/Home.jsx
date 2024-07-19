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

export default function Home() {
  const [mode, setMode] = useState(localStorage.getItem("theme"));
  const language = localStorage.getItem("LANGUAGE");
  const [background, setBackground] = useState(true);

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
            <img src="/image/watches.png" className="z-30" alt="Watches" />
            <div
              className={`w-2/3 py-4 px-8 z-10 text-primary-text shadow-lg rounded-lg text-center lg:text-center`}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
                ELEGANCE
              </h1>
              <h1 className="text-xl sm:text-2xl">IN</h1>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
                TIME
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/3 m-auto text-center gap-y-4 text-white p-4 lg:p-0">
          <p className="text-lg sm:text-xl font-semibold">
            Discover a diverse collection of the finest watch brands with
          </p>
          <div className="mt-4 lg:mt-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
              ABDEEN
            </h1>
            <h1 className="text-xl sm:text-2xl">for</h1>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
              Watches
            </h1>
          </div>
          <p className="text-lg sm:text-xl font-semibold">
            where luxury and quality meet.
          </p>
          <div className="flex gap-4 mt-6 lg:mt-10 m-auto">
            <button className="hover:text-black text-white">
              <FaSquareFacebook size={32} />
            </button>
            <button className="hover:text-black text-white">
              <FaSquareInstagram size={32} />
            </button>
            <button className="hover:text-black text-white">
              <FaSquareWhatsapp size={32} />
            </button>
            <button className="hover:text-black text-white">
              <FaSquareXTwitter size={32} />
            </button>
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
