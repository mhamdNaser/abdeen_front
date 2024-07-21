import React from "react";
import ProductCard from "./ProductCard";
import HorProductCard from "./HorProductCard";

const ProductList = ({
  products,
  buttontitle,
  getCardProductNum,
  getLikeNum,
  hor,
}) => {
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
    <div
      className={`${
        !hor ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "w-full"
      }`}
    >
      {products.map((product) =>
        hor === true ? (
          <HorProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            likeProduct={likeProduct}
            viewProduct={viewProduct}
            buttontitle={buttontitle}
            getCardProductNum={getCardProductNum}
          />
        ) : (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            likeProduct={likeProduct}
            viewProduct={viewProduct}
            buttontitle={buttontitle}
            getCardProductNum={getCardProductNum}
          />
        )
      )}
    </div>
  );
};

export default ProductList;
