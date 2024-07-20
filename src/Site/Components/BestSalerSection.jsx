import React, { useState, useEffect } from "react";
import ProductList from "./products/ProductList";
import axiosClient from "../../axios-client";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";

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
      <ProductList
        products={products}
        getLikeNum={getLikeNum}
        getCardProductNum={getCardProductNum}
      />
    </div>
  );
}
