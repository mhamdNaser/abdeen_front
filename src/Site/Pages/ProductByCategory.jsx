import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import ProductList from "../Components/products/ProductList";
import SitePageTitle from "../Components/SitePageTitle";

export default function ProductByCategory() {
  const { setBackground, getLikeNum, getCardProductNum, menuItems, brands } =
    useOutletContext();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [horvalue, setHorValue] = useState();
  const location = useLocation();
  const { en_name, ar_name } = location.state || {
    en_name: "",
    ar_name: "",
  };

  const getProducts = () => {
    axiosClient.get(`site/category-products/${id}`).then((res) => {
      setProducts(res.data.data);
    });
  };

  const getHorValue = (value) => {
    setHorValue(value);
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true); // Cleanup function to reset the background when the component unmounts
  }, [setBackground]);

  return (
    <div className="flex xl:p-10 p-4 h-fit justify-center">
      <div className="flex flex-col xl:w-3/4 w-full text-center">
        <SitePageTitle
          entitle={en_name}
          artitle={ar_name}
          number={products.length}
          getHorValue={getHorValue}
        />
        <div className="p-4">
          <ProductList
            filter={true}
            brands={brands}
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