import React, { useEffect, useState } from "react";
import ProductList from "./products/ProductList";
import axiosClient from "../../axios-client";
import { BiSolidChevronsRight } from "react-icons/bi";
import { useOutletContext, Link } from "react-router-dom";

export default function ProductSection() {
  const { getLikeNum, getCardProductNum } = useOutletContext();
  const [products, setProducts] = useState([]);
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
      <h3 className="text-4xl font-bold p-8">All Product</h3>
      <ProductList
        products={displayedProducts}
        addToCart={addToCart}
        likeProduct={likeProduct}
        viewProduct={viewProduct}
      />
      <Link to={"/allProduct"} className="flex items-center justify-center gap-3 btn my-10 font-extrabold text-xl text-gray-300 hover:text-gray-800">
        All Products
        <BiSolidChevronsRight size={32} className="mt-1" />
      </Link>
    </div>
  );
}
