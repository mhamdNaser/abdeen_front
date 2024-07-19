import React, { useEffect, useState } from "react";
import { BiSolidChevronUp, BiSolidChevronDown } from "react-icons/bi";
import axiosClient from "../../../axios-client";

export default function ProductCardInCart({
  product,
  index,
  onIncrease,
  onDecrease,
  onTagSelect,
  selectedTags,
  onTotalCostChange,
}) {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    axiosClient.get(`site/show-product/${product.id}`).then((res) => {
      setProductDetails(res.data.product);
    });
  }, [product.id]);

  useEffect(() => {
    if (productDetails) {
      const totalCost = product.quantity * productDetails.public_price;
      onTotalCostChange(product.id, totalCost);
    }
  }, [productDetails, product.quantity]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border bg-blocks-color rounded-lg shadow-lg flex justify-between items-center">
      <div className="flex w-1/2 text-start">
        <img
          src={import.meta.env.VITE_WEBSITE_URL + productDetails.image}
          alt={productDetails.en_name}
          className="w-40 min-h-40 max-h-full object-cover"
        />
        <div className="flex flex-col text-start ps-3 py-2">
          <h4 className="font-bold text-lg mb-2">{productDetails.en_name}</h4>
          <div className="text-md text-gray-600">
            {productDetails.en_description}
          </div>
          {Object.entries(
            (productDetails.tags || []).reduce((groups, tag) => {
              const attribute = tag.attribute;
              if (!groups[attribute]) {
                groups[attribute] = [];
              }
              groups[attribute].push(tag);
              return groups;
            }, {})
          ).map(([attribute, tagsGroup]) => (
            <div
              key={attribute}
              className="flex flex-wrap items-center gap-2 my-1"
            >
              <span>{attribute}</span>
              <div className="mx-3 flex flex-wrap items-center gap-2 my-1">
                {tagsGroup.map((tag, tagIndex) => (
                  <div
                    key={tag.id}
                    // onClick={() =>
                    //   onTagSelect(index, product.id, tag.id, attribute)
                    // }
                    style={{
                      backgroundColor:
                        attribute.toUpperCase() === "COLOR"
                          ? tag.en_description
                          : "",
                      opacity:
                        selectedTags?.[attribute] === tag.id ||
                        (selectedTags?.[attribute] === undefined &&
                          tagIndex === 0)
                          ? "1"
                          : "0.4",
                    }}
                    className={`focus:outline-background-color outline-none ${
                      attribute.toUpperCase() !== "COLOR"
                        ? "rounded-sm px-2"
                        : "rounded-full min-h-6 min-w-6"
                    }  text-sm`}
                  >
                    {attribute.toUpperCase() !== "COLOR" ? tag.en_name : ""}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/6 xl:flex hidden flex-col gap-y-3 text-start">
        <div className="flex text-md">
          Quantity in Cart:
          <span
            className={`ml-2 flex items-center gap-2 ${
              product.quantity > productDetails.quantity
                ? "text-red-500"
                : "text-black"
            }`}
          >
            {product.quantity}
            <div className="flex items-center border gap-2 p-1">
              <button
                onClick={onDecrease}
                className=" text-gray-400 hover:text-red-600 flex items-center"
              >
                <BiSolidChevronDown size={14} />
              </button>
              <button
                onClick={onIncrease}
                className=" text-gray-400 hover:text-green-600 flex items-center"
              >
                <BiSolidChevronUp size={14} />
              </button>
            </div>
          </span>
        </div>
        <div className="text-md">
          Product public_price: {productDetails.public_price}
        </div>
      </div>
      <div className="w-1/6 md:w-1/3 lg:text-end md:text-start px-8">
        <div className="w-full lg:hidden flex flex-col gap-y-3 text-start">
          <div className="flex text-md">
            Quantity in Cart:
            <span
              className={`ml-2 flex items-center gap-2 ${
                product.quantity > productDetails.quantity
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              {product.quantity}
              <div className="flex items-center justify-end border gap-2 p-1">
                <button
                  onClick={onDecrease}
                  className=" text-gray-400 hover:text-red-600 flex items-center"
                >
                  <BiSolidChevronDown size={14} />
                </button>
                <button
                  onClick={onIncrease}
                  className=" text-gray-400 hover:text-green-600 flex items-center"
                >
                  <BiSolidChevronUp size={14} />
                </button>
              </div>
            </span>
          </div>
          <div className="text-md">
            Product public_price: {productDetails.public_price}
          </div>
        </div>
        <div className="text-md">
          Total public_price: {productDetails.public_price * product.quantity}
        </div>
      </div>
    </div>
  );
}
