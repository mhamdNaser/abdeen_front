import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import axiosClient from "../../axios-client";
import { useOutletContext } from "react-router-dom";

export default function Searchmenu({ setProductView, productdetails, setProductDetails }) {
  const [showsearch, setShowsearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const hanelProductInfo = (product , productId, productName) => {
    setProductView(true);
    setProductDetails(product);
    axiosClient.get(`site/add-view-product/${productId}`);
  };

  const getShowsearch = () => {
    setShowsearch(!showsearch);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showsearch &&
        !document.querySelector(".search-dropdown").contains(event.target)
      ) {
        setShowsearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showsearch]);

  const handleSearch = async () => {
    try {
      const response = await axiosClient.get("/site/products/search", {
        params: {
          searchTerm,
        },
      });
      setResults(response.data.data);
      setShowsearch(true); // Show the dropdown after search
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-3 bg-white w-full py-4 px-3">
        <input
          type="text"
          className="text-gray-500 w-full border-0 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <BiSearch size={24} className="text-gray-400" onClick={handleSearch} />
      </div>
      {showsearch && (
        <div className="absolute z-10 w-full bg-[#3e3e3e] text-white shadow-md search-dropdown">
          {results.map((product) => (
            <button
              key={product.id}
              className="p-2 w-full border-b flex items-center"
              onClick={() =>
                hanelProductInfo(product, product.id, product.en_name)
              }
            >
              <img
                src={import.meta.env.VITE_WEBSITE_URL + product.image}
                alt={product.en_name}
                className="w-16 h-16 object-cover mr-2"
              />
              <div>
                <div>{product.en_name}</div>
                <div>{product.ar_name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
