import React, { useState, useEffect } from "react";
import ProductList from "./products/ProductList";
import axiosClient from "../../axios-client";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";


export default function BestDiscountedSection() {
  const { getLikeNum, getCardProductNum } = useOutletContext();
  const [products, setProducts] = useState([]);
  const { translations } = useTranslation();

  const getProducts = () => {
    axiosClient.get("site/topDiscounted-products").then((data) => {
      setProducts(data.data.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center text-center">
      <h3 className="text-4xl font-bold p-8">
        {(translations && translations["Special Offer"]) || "Special Offer"}
      </h3>
      <ProductList
        products={products}
        getLikeNum={getLikeNum}
        getCardProductNum={getCardProductNum}
      />
    </div>
  );
}
