import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductList from "../Components/products/ProductList";
import axiosClient from "../../axios-client";
import { useTranslation } from "../../provider/TranslationProvider";

export default function AllProduct() {
  const { setBackground, getLikeNum, getCardProductNum } = useOutletContext();
  const [products, setProducts] = useState([]);
  const { translations } = useTranslation();
  const getProducts = () => {
    axiosClient.get("site/all-products").then((data) => {
      setProducts(data.data.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true); // Cleanup function to reset the background when the component unmounts
  }, [setBackground]);
  return (
    <div className="flex p-10 gap-10 h-fit justify-center">
      <div className="flex flex-col justify-center text-center">
        <h3 className="text-4xl font-bold p-8">
          {(translations && translations["All Products"]) || "All Products"}
        </h3>
        <ProductList
          products={products}
          getLikeNum={getLikeNum}
          getCardProductNum={getCardProductNum}
        />
      </div>
    </div>
  );
}
