import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({
  products,
  addToCart,
  likeProduct,
  viewProduct,
  buttontitle,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          likeProduct={likeProduct}
          viewProduct={viewProduct}
          buttontitle={buttontitle}
        />
      ))}
    </div>
  );
};

export default ProductList;
