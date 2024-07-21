import React from "react";
import { BiSolidHeart, BiSolidShow } from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";

const HorProductCard = ({
  product,
  addToCart,
  likeProduct,
  viewProduct,
  buttontitle,
}) => {
  // Retrieve existing liked products from localStorage
  let existingProducts =
    JSON.parse(localStorage.getItem("Like_products")) || [];

  // Check if the product ID exists in existingProducts
  const isLiked = existingProducts.some((p) => p.id === product.id);
  const language = localStorage.getItem("LANGUAGE");
  const { translations } = useTranslation();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex gap-4 my-4">
      {product.discount > 0 && (
        <div className="relative">
          <div className="absolute min-w-[52px] bg-redColor text-xs text-white px-3 py-[3px] rounded-md top-2 right-2">
            {product.discount} {"%"}
          </div>
        </div>
      )}

      <div className="flex-shrink">
        <img
          className="h-28 w-28 object-cover rounded-md"
          src={import.meta.env.VITE_WEBSITE_URL + product.image}
          alt={language === "ar" ? product.ar_name : product.en_name}
        />
      </div>

      {/* معلومات المنتج */}
      <div className="flex-grow flex-col w-1/3 text-start">
        <div className="flex flex-col justify-end h-full">
          <h3 className="text-lg font-bold">
            {language === "ar" ? product.ar_name : product.en_name}
          </h3>
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
              {(translations && translations["Quantity"]) || "Quantity"} :
            </span>{" "}
            {product.quantity}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-1/3 items-end justify-end">
        <div className="py-4 px-1">
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
        </div>
        {addToCart && (
          <button
            className="bg-redColor w-1/3 text-white px-4 py-2 rounded hover:bg-red-800 mb-2"
            onClick={() => addToCart(product)}
          >
            {!buttontitle
              ? (translations && translations["Add to Cart"]) || "Add to Cart"
              : buttontitle}
          </button>
        )}
        <button
          className="bg-blueColor w-1/3 text-white py-2 rounded hover:bg-blue-800"
          onClick={() => viewProduct(product)}
        >
          <BiSolidShow className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default HorProductCard;
