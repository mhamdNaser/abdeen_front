import React, { useState } from "react";
import {
  BiSolidHeart,
  BiSolidShow,
  BiLogoWhatsappSquare,
} from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";
import { Link, useOutletContext } from "react-router-dom";
import axiosClient from "../../../axios-client";

const ProductCard = ({ product, addToCart, likeProduct, viewProduct, buttontitle }) => {
  let existingProducts =
    JSON.parse(localStorage.getItem("Like_products")) || [];
  const { setProductDetails, setProductView } =
    useOutletContext();

  // Check if the product ID exists in existingProducts
  const isLiked = existingProducts.some((p) => p.id === product.id);
  const language = localStorage.getItem("LANGUAGE");
  const { translations } = useTranslation();

  const hanelProductInfo = (productId, productName) => { 
    setProductView(true);
    setProductDetails(product);
    axiosClient.get(`site/add-view-product/${productId}`);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 z-0 relative w-full xl:text-start text-center justify-center ">
      {product.discount > 0 && (
        <div className="relative px-8 z-0">
          <div className="absolute bg-redColor text-xs text-white px-3 py-[3px] rounded-md top-2 right-2">
            {product.discount} {"%"}
          </div>
        </div>
      )}

      <img
        className="min-w-80 max-w-80 min-h-80 max-h-80 rounded-md m-auto"
        src={import.meta.env.VITE_WEBSITE_URL + product.image}
        alt={language === "ar" ? product.ar_name : product.en_name}
      />

      {/* معلومات المنتج */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">
          {language === "ar" ? product.ar_name : product.en_name}
        </h3>
        {/* <p className="text-gray-600">{product.en_description}</p> */}
        {product.discount === 0 ? (
          <p className="text-blue-500 font-semibold">
            {parseFloat(product.public_price).toFixed(2)} {"JD"}
          </p>
        ) : (
          <p className="flex gap-3">
            <span className="text-red-500 font-bold line-through">
              {parseFloat(product.public_price).toFixed(2)} {"JD"}
            </span>
            <span className="text-blue-500 font-semibold">
              {parseFloat(product.public_price).toFixed(2) -
                (parseFloat(product.public_price).toFixed(2) *
                  parseFloat(product.discount).toFixed(2)) /
                  100}{" "}
              {"JD"}
            </span>
          </p>
        )}
        {/* بيانات إضافية */}
        <p className="text-sm text-gray-500">
          <span className="font-extrabold">
            {(translations && translations["Brand"]) || "Brand"} :
          </span>{" "}
          {language === "ar" ? product.ar_brand : product.en_brand},{" "}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-extrabold">
            {(translations && translations["Category"]) || "Category"} :
          </span>{" "}
          {language === "ar" ? product.ar_category : product.en_category}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-extrabold">
            {" "}
            {(translations && translations["Quantity"]) || "Quantity"} :
          </span>{" "}
          {product.quantity}
        </p>
      </div>

      <div className="mt-4 flex w-full justify-between gap-1">
        {addToCart && (
          <button
            className="bg-redColor w-3/4 text-white px-4 py-2 rounded hover:bg-red-800"
            onClick={() => addToCart(product)}
          >
            {!buttontitle
              ? (translations && translations["Add to Cart"]) || "Add to Cart"
              : buttontitle}
          </button>
        )}
        {viewProduct && (
          <>
            <button
              className="bg-blueColor w-1/4 text-white px-4 flex items-center justify-center rounded hover:bg-blue-800"
              onClick={() => hanelProductInfo(product.id, product.en_name)}
            >
              <BiSolidShow />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
