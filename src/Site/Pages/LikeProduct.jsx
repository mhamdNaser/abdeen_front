import React, { useEffect, useState } from "react";
import ProductList from "../Components/products/ProductList";
import { useOutletContext } from "react-router-dom";

export default function LikeProduct() {
  let cardsProducts = JSON.parse(localStorage.getItem("Card_products")) || [];
  const { setBackground, getCardProductNum } = useOutletContext();

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true);
  }, [setBackground]);

  const viewProduct = (product) => {
    console.log(product);
  };

  const removefromcard = (product) => {
    cardsProducts = cardsProducts.filter((p) => p.id !== product.id);
    localStorage.setItem("Card_products", JSON.stringify(cardsProducts));
    getCardProductNum();
  };

  return (
    <div className="flex p-10 gap-10 h-fit justify-center">
      <div className="flex flex-col justify-center text-center">
        <h3 className="text-4xl font-bold p-8">All Product</h3>
        <ProductList
          products={cardsProducts}
          viewProduct={viewProduct}
          addToCart={removefromcard}
          buttontitle={"delete from card"}
        />
      </div>
    </div>
  );
}
