import React, { useState, useEffect } from "react";
import ProductList from "./products/ProductList";
import axiosClient from "../../axios-client";
import { useOutletContext } from "react-router-dom";


export default function BestDiscountedSection() {
  const { getLikeNum, getCardProductNum } = useOutletContext();
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axiosClient.get("site/topDiscounted-products").then((data) => {
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

  const likeProduct = (product) => {
    let existingProducts =
      JSON.parse(localStorage.getItem("Like_products")) || [];

    const index = existingProducts.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      existingProducts.splice(index, 1);
    } else {
      existingProducts = [...existingProducts, product];
    }

    localStorage.setItem("Like_products", JSON.stringify(existingProducts));
    getLikeNum();
  };

  const viewProduct = (product) => {
    console.log("Viewing product:", product);
  };
  return (
    <div className="flex flex-col justify-center text-center">
      <h3 className="text-4xl font-bold p-8">Special Offer</h3>
      <ProductList
        products={products}
        addToCart={addToCart}
        likeProduct={likeProduct}
        viewProduct={viewProduct}
      />
    </div>
  );
}
