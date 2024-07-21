import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductList from "../Components/products/ProductList";
import axiosClient from "../../axios-client";
import { useTranslation } from "../../provider/TranslationProvider";
import SitePageTitle from "../Components/SitePageTitle";

export default function AllProduct() {
  const { setBackground, getLikeNum, getCardProductNum } = useOutletContext();
  const [products, setProducts] = useState([]);
  const { translations } = useTranslation();
  const [horvalue, setHorValue] = useState();
  const getProducts = () => {
    axiosClient.get("site/all-products").then((data) => {
      setProducts(data.data.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getHorValue = (value) => {
    setHorValue(value);
  };

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true); // Cleanup function to reset the background when the component unmounts
  }, [setBackground]);
  return (
    <div className="flex p-10 h-fit justify-center">
      <div className="flex flex-col w-3/4 text-center">
        <SitePageTitle
          entitle={"All Products"}
          artitle={translations["All Products"]}
          number={products.length}
          getHorValue={getHorValue}
        />
        <div className="p-4">
          <ProductList
            hor={horvalue}
            products={products}
            getLikeNum={getLikeNum}
            getCardProductNum={getCardProductNum}
          />
        </div>
      </div>
    </div>
  );
}
