import React from "react";
import { BiSolidLike, BiSolidShow } from "react-icons/bi";

const ProductCard = ({ product, addToCart, likeProduct, viewProduct }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      <div className="relative px-8">
        <div className="absolute top-2 right-2">
          <button
            className="bg-white text-gray-400 p-2 rounded-full hover:bg-redColor hover:text-white"
            onClick={() => likeProduct(product)}
          >
            <BiSolidLike />
          </button>
        </div>
        <div className="absolute top-2 left-2">
          <button
            className="bg-white text-gray-400 p-2 rounded-full hover:bg-blueColor hover:text-white"
            onClick={() => viewProduct(product)}
          >
            <BiSolidShow />
          </button>
        </div>
      </div>
      <img
        className="w-full h-48 object-cover rounded-md"
        src={product.image}
        alt={product.name}
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-500 font-semibold">${product.price}</p>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-redColor w-full text-white px-4 py-2 rounded hover:bg-red-800"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
