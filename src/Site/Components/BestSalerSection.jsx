import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";
import ProductCard from "./products/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

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

  const addToCart = (product) => {
    let cardsProducts = JSON.parse(localStorage.getItem("Card_products")) || [];

    let cartProductIndex = cardsProducts.findIndex(
      (item) => item.id === product.id
    );

    if (cartProductIndex !== -1) {
      // Product is already in the cart, increment its quantity
      cardsProducts[cartProductIndex].quantity += 1;
    } else {
      // Product is not in the cart, add it with quantity 1
      cardsProducts.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem("Card_products", JSON.stringify(cardsProducts));
    getCardProductNum();
  };

  return (
    <div className="flex flex-col justify-center text-center">
      <h3 className="text-4xl font-bold p-8">
        {(translations && translations["Best Saller"]) || "Best Saller"}
      </h3>
      <div className="container w-full m-auto">
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
          {products.map((product) => (
            <SwiperSlide key={product.id} className="px-2">
              <ProductCard
                product={product}
                addToCart={addToCart}
                getCardProductNum={getCardProductNum}
                likeProduct={getLikeNum}
                viewProduct={(product) => console.log(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
