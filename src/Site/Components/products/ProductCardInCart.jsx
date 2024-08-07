import React, { useEffect, useState } from "react";
import { BiSolidChevronUp, BiSolidChevronDown } from "react-icons/bi";
import axiosClient from "../../../axios-client";
import { useTranslation } from "../../../provider/TranslationProvider";

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
  const { translations, language } = useTranslation();

  useEffect(() => {
    axiosClient.get(`site/show-product/${product.id}`).then((res) => {
      setProductDetails(res.data.product);
    });
  }, [product.id]);

  useEffect(() => {
    if (productDetails) {
      const totalCost = product.quantity * productDetails.public_price;
      const totalDiscount =
        product.quantity *
        (productDetails.public_price *
        (productDetails.discount / 100)); 
      onTotalCostChange(product.id, totalCost, totalDiscount);
    }
    console.log(product.discount);
  }, [productDetails, product.quantity]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border bg-blocks-color rounded-lg shadow-lg flex xl:flex-row flex-col justify-between p-5 items-center xl:items-end">
      <div className="flex xl:flex-row flex-col xl:w-1/2 w-full text-start">
        <img
          src={import.meta.env.VITE_WEBSITE_URL + productDetails.image}
          alt={productDetails.en_name}
          className="xl:w-40 xl:h-40 xl:max-h-full w-full object-cover"
        />
        <div className="flex flex-col text-start justify-end ps-3 py-2">
          <h4 className="font-bold text-lg mb-2">
            {language === "ar"
              ? productDetails.ar_name
              : productDetails.en_name}
          </h4>
          <div className="text-md text-gray-600 max-w-[180px] overflow-hidden whitespace-nowrap">
            <p className="truncate">
              {language === "ar"
                ? productDetails.ar_description
                : productDetails.en_description}
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
                    className={`focus:outline-background-color outline-none ${
                      attribute.toUpperCase() !== "COLOR"
                        ? "rounded-sm px-2"
                        : "rounded-full min-h-6 min-w-6"
                    }  text-sm`}
                  >
                    {attribute.toUpperCase() !== "COLOR"
                      ? language === "ar"
                        ? tag.ar_name
                        : tag.en_name
                      : ""}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/4 xl:flex hidden flex-col gap-y-3 py-3 text-start">
        <div className="flex text-md">
          {(translations && translations["Quantity in Cart"]) ||
            "Quantity in Cart"}
          <span
            className={`ml-2 text-greenColor font-bold flex items-center px-2 gap-2 ${
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
          {(translations && translations["Product public_price"]) ||
            "Product public_price"}
          {" :"} {parseFloat(productDetails.public_price).toFixed(2)}
        </div>
        <div className="text-md">
          {(translations && translations["Product Discount"]) ||
            "Product Discount"}
          {" :"}{" "}
          <span className="text-redColor">
            {productDetails.discount > 0
              ? parseFloat(productDetails.discount) + "%"
              : null}
          </span>
        </div>
      </div>
      <div className="xl:w-1/6 w-full md:text-start px-3 py-3">
        <div className="w-full xl:hidden flex flex-col gap-y-3 text-start">
          <div className="flex text-md">
            {(translations && translations["Quantity in Cart"]) ||
              "Quantity in Cart"}
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
            {(translations && translations["Product public_price"]) ||
              "Product public_price"}
            {" :"} {parseFloat(productDetails.public_price).toFixed(2)}
          </div>
          <div className="text-md">
            {(translations && translations["Product Discount"]) ||
              "Product Discount"}
            {" :"}{" "}
            <span className="text-redColor">
              {productDetails.discount > 0
                ? parseFloat(productDetails.discount) + "%"
                : null}
            </span>
          </div>
        </div>
        <div className="text-md">
          {(translations && translations["Total Discount"]) || "Total Discount"}
          {" :"}
          {parseFloat(
            productDetails.public_price *
              product.quantity *
              (productDetails.discount / 100)
          ).toFixed(2)}
        </div>
        <div className="text-md">
          {(translations && translations["Total public_price"]) ||
            "Total public_price"}
          {" :"}
          {parseFloat(productDetails.public_price * product.quantity).toFixed(
            2
          )}
        </div>
        {product.quantity > productDetails.quantity ? (
          <small className="text-redColor">
            {(translations && translations["Demand exceeds supply."]) ||
              "Demand exceeds supply."}
          </small>
        ) : null}
      </div>
    </div>
  );
}
