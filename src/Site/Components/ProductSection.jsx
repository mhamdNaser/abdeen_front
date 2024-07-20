import React, { useEffect, useState } from "react";
import ProductList from "./products/ProductList";
import axiosClient from "../../axios-client";
import { BiSolidChevronsRight } from "react-icons/bi";
import { useOutletContext, Link } from "react-router-dom";
import { useTranslation } from "../../provider/TranslationProvider";

export default function ProductSection() {
  const { getLikeNum, getCardProductNum } = useOutletContext();
  const [products, setProducts] = useState([]);
  const { translations } = useTranslation();
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const getProducts = () => {
    axiosClient.get("site/all-products").then((data) => {
      setProducts(data.data.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const displayRandomProducts = () => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setDisplayedProducts(shuffled.slice(0, 8));
      };

      displayRandomProducts(); // Initial display

      const interval = setInterval(displayRandomProducts, 20000);

      return () => clearInterval(interval);
    }
  }, [products]);

  return (
    <div className="flex flex-col justify-center text-center">
      <h3 className="text-4xl font-bold p-8">
        {(translations && translations["All Products"]) || "All Products"}
      </h3>
      <ProductList
        products={displayedProducts}
        getLikeNum={getLikeNum}
        getCardProductNum={getCardProductNum}
      />
      <Link
        to={"/allProduct"}
        className="flex items-center justify-center gap-3 btn my-10 font-extrabold text-xl text-gray-300 hover:text-gray-800"
      >
        {(translations && translations["All Products"]) || "All Products"}
        <BiSolidChevronsRight size={32} className="mt-1" />
      </Link>
    </div>
  );
}
