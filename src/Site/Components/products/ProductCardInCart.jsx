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
    <div className="border bg-blocks-color rounded-lg shadow-lg flex xl:flex-row flex-col justify-between items-center">
      <div className="flex xl:flex-row flex-col xl:w-1/2 w-full text-start">
        <img
          src={import.meta.env.VITE_WEBSITE_URL + productDetails.image}
          alt={productDetails.en_name}
          className="xl:w-40 xl:min-h-40 xl:max-h-full w-full object-cover"
        />
        <div className="flex flex-col text-start ps-3 py-2">
          <h4 className="font-bold text-lg mb-2">{productDetails.en_name}</h4>
          <div className="text-md text-gray-600 max-w-[180px] overflow-hidden whitespace-nowrap">
            <p className="truncate">
              {productDetails.en_description}
            </p>
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
                    className={`focus:outline-background-color outline-none ${attribute.toUpperCase() !== "COLOR"
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
      <div className="w-1/4 xl:flex hidden flex-col gap-y-3 text-start">
        <div className="flex text-md">
          Quantity in Cart:
          <span
            className={`ml-2 flex items-center gap-2 ${product.quantity > productDetails.quantity
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
      <div className="xl:w-1/6 w-full lg:text-end md:text-start xl:px-8 px-3 py-3">
        <div className="w-full xl:hidden flex flex-col gap-y-3 text-start">
          <div className="flex text-md">
            Quantity in Cart:
            <span
              className={`ml-2 flex items-center gap-2 ${product.quantity > productDetails.quantity
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
