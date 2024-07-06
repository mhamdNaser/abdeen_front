import React from "react";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareWhatsapp,
} from "react-icons/fa6";
import HomeSlider from "../Components/SliderSection";
import SliderSection from "../Components/SliderSection";
import ProductSection from "../Components/ProductSection";

export default function Home() {
  return (
    <>
      <div className="flex w-full min-h-[720px]  items-center">
        <div className="flex flex-col w-2/3">
          <div className={`flex items-center text-center`}>
            <img src="/image/watches.png" className="z-30" alt="" />
            <div className="w-1/2 p-8 z-10 ms-[-180px] shadow-lg rounded-lg text-center">
              <h1 className="text-7xl font-bold text-gray-800 mb-4">ABDEEN</h1>
              <h1 className="text-2xl text-gray-600">for</h1>
              <h1 className="text-7xl font-bold text-gray-800 mb-4">Watches</h1>
            </div>
          </div>
          <div className="flex gap-4 ms-40 mt-10 text-[#3f3f3f]">
            <button className="hover:text-redColor">
              <FaSquareFacebook size={32} />
            </button>
            <button className="hover:text-redColor">
              <FaSquareInstagram size={32} />
            </button>
            <button className="hover:text-redColor">
              <FaSquareWhatsapp size={32} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center min-h-[720px]  items-center">
        {/* <SliderSection /> */}
        <ProductSection />
      </div>
    </>
  );
}
