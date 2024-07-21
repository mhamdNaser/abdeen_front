import React, { useState } from "react";
import ProductCard from "./ProductCard";
import HorProductCard from "./HorProductCard";
import Filter from "./Filter";

const ProductList = ({
  products,
  buttontitle,
  getCardProductNum,
  getLikeNum,
  hor,
  menuItems = [],
  brands = [],
  filter,
}) => {
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: "",
  });

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.en_category);
    const matchesBrand =
      filters.brands.length === 0 || filters.brands.includes(product.en_brand);
    const matchesPriceRange = (() => {
      if (filters.priceRange === "") return true;
      const price = product.public_price;
      if (filters.priceRange === "0-25") return price >= 0 && price <= 25;
      if (filters.priceRange === "25-50") return price > 25 && price <= 50;
      if (filters.priceRange === "50-100") return price > 50 && price <= 100;
      if (filters.priceRange === "100+") return price > 100;
      return true;
    })();

    return matchesCategory && matchesBrand && matchesPriceRange;
  });

  return (
    <div className="flex flex-col gap-y-3 xl:gap-y-0 xl:flex-row gap-x-12 xl:g-x-0">
      {filter === true ? (
        <div className="2xl:w-1/5 w-full bg-blocks-color h-fit">
          <Filter
            filters={filters}
            setFilters={setFilters}
            menuItems={menuItems}
            brands={brands}
          />
        </div>
      ) : null}
      <div
        className={`${!hor ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "w-full"}
        ${filter === true ? "xl:w-4/5 w-full lg:grid-cols-3" : "lg:grid-cols-4"}`}
      >
        {filteredProducts.map((product) =>
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
    </div>
  );
};

export default ProductList;
