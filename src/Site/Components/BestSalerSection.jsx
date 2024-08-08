import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../../axios-client";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";
import ProductCard from "./products/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

export default function BestSalerSection() {
  const { getLikeNum, getCardProductNum } = useOutletContext();
  const { translations } = useTranslation();
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axiosClient.get("site/topbuy-products").then((data) => {
      setProducts(data.data.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center text-center">
      <h3 className="text-4xl font-bold p-8">
        {(translations && translations["Best Saller"]) || "Best Saller"}
      </h3>
      <div className="container w-full m-auto">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="px-2">
              <ProductCard
                product={product}
                addToCart={getCardProductNum}
                likeProduct={getLikeNum}
                viewProduct={(product) => console.log(product)}
                buttontitle="View Details"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
