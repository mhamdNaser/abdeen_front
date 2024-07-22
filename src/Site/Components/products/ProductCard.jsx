import React from "react";
import { BiSolidHeart, BiSolidShow } from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart, likeProduct, viewProduct, buttontitle }) => {
  // Retrieve existing liked products from localStorage
  let existingProducts =
    JSON.parse(localStorage.getItem("Like_products")) || [];

  // Check if the product ID exists in existingProducts
  const isLiked = existingProducts.some((p) => p.id === product.id);
  const language = localStorage.getItem("LANGUAGE");
  const { translations } = useTranslation();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 z-0 relative text-start">
      {product.discount > 0 && (
        <div className="relative px-8 z-0">
          <div className="absolute bg-redColor text-xs text-white px-3 py-[3px] rounded-md top-2 right-2">
            {product.discount} {"%"}
          </div>
        </div>
      )}
      {/* <div className="relative px-8">
        <div className="absolute top-2 right-2">
          {likeProduct && (
            <button
              className={`p-2 rounded-full ${
                isLiked
                  ? "bg-red-500 text-red-300 hover:bg-redColor hover:text-white"
                  : "text-gray-400 bg-white hover:bg-redColor hover:text-white"
              }`}
              onClick={() => likeProduct(product)}
            >
              <BiSolidHeart />
            </button>
          )}
        </div>
        <div className="absolute top-2 left-2">
          {viewProduct && (
            <button
              className="bg-white text-gray-400 p-2 rounded-full hover:bg-blueColor hover:text-white"
              onClick={() => viewProduct(product)}
            >
              <BiSolidShow />
            </button>
          )}
        </div>
      </div> */}

      <img
        className="xl:w-72 lg:w-72 lg:h-48 h-60 w-full  rounded-md"
        src={import.meta.env.VITE_WEBSITE_URL + product.image}
        alt={language === "ar" ? product.ar_name : product.en_name}
      />

      {/* معلومات المنتج */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">
          {language === "ar" ? product.ar_name : product.en_name}
        </h3>
        {/* <p className="text-gray-600">{product.en_description}</p> */}
        {product.discount === 0 ? (
          <p className="text-blue-500 font-semibold">
            {product.public_price} JD
          </p>
        ) : (
          <p className="flex gap-3">
            <span className="text-red-500 font-bold line-through">
              {product.public_price} JD
            </span>
            <span className="text-blue-500 font-semibold">
              {product.public_price -
                (product.public_price * product.discount) / 100}{" "}
              JD
            </span>
          </p>
        )}
        {/* بيانات إضافية */}
        <p className="text-sm text-gray-500">
          <span className="font-extrabold">
            {(translations && translations["Brand"]) || "Brand"} :
          </span>{" "}
          {language === "ar" ? product.ar_brand : product.en_brand},{" "}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-extrabold">
            {(translations && translations["Category"]) || "Category"} :
          </span>{" "}
          {language === "ar" ? product.ar_category : product.en_category}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-extrabold">
            {" "}
            {(translations && translations["Quantity"]) || "Quantity"} :
          </span>{" "}
          {product.quantity}
        </p>
      </div>

      <div className="mt-4 flex justify-between gap-1">
        {addToCart && (
          <button
            className="bg-redColor w-full text-white px-4 py-2 rounded hover:bg-red-800"
            onClick={() => addToCart(product)}
          >
            {!buttontitle
              ? (translations && translations["Add to Cart"]) || "Add to Cart"
              : buttontitle}
          </button>
        )}
        {viewProduct && (
          <Link
            className="bg-blueColor text-white px-4 flex items-center rounded hover:bg-blue-800"
            to={`/siteviewproduct/${product.id}/${product.en_name}`}
          >
            <BiSolidShow />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
