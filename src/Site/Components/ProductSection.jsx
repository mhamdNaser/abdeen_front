import React, { useState } from "react";
import ProductList from "./products/ProductList";

export default function ProductSection() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      price: 10,
      image: "/image/background.png",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      price: 20,
      image: "/image/background1.png",
    },
    // أضف المزيد من المنتجات هنا
  ]);

  const addToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const likeProduct = (product) => {
    console.log("Liked product:", product);
  };

  const viewProduct = (product) => {
    console.log("Viewing product:", product);
  };
  return (
    <ProductList
      products={products}
      addToCart={addToCart}
      likeProduct={likeProduct}
      viewProduct={viewProduct}
    />
  );
}
