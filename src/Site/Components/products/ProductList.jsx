import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart, likeProduct, viewProduct }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          likeProduct={likeProduct}
          viewProduct={viewProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
