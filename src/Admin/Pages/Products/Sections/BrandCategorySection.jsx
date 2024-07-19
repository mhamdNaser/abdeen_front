import React, { useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import axiosClient from '../../../../axios-client';

export default function BrandCategorySection({ Product }) {
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();

  const saveBrand = () => {
    axiosClient.get(`admin/show-brand/${Product.brand}`).then((data) => {
      setBrand(data.data.brand);
    });
  };

  const saveCategory = () => {
    axiosClient.get(`admin/show-category/${Product.category}`).then((data) => {
      setCategory(data.data.category);
    });
  };

  useEffect(() => {
    saveBrand();
    saveCategory();
  }, []);
  return (
    <>
      <section className="mb-8">
        {brand && (
          <div className="bg-blocks-color shadow-md rounded-lg p-4">
            <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
              <span>Brand</span>
              {brand.image ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={`${import.meta.env.VITE_WEBSITE_URL}${brand?.image}`}
                  alt={brand?.en_name}
                />
              ) : (
                <BiSolidUserCircle className="h-10 w-10 rounded-full" />
              )}
            </h2>
            <div className="flex flex-col gap-4 py-2">
              <p>
                <strong className="pe-2">Arabic Name:</strong> {brand.ar_name}
              </p>
              <p>
                <strong className="pe-2">English Name:</strong> {brand.en_name}
              </p>
              <p>
                <strong className="pe-2">Description (English)</strong>{" "}
                {brand.en_description}
              </p>
              <p>
                <strong className="pe-2">Description (Arabic)</strong>{" "}
                {brand.ar_description}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8">
        {category && (
          <div className="bg-blocks-color shadow-md rounded-lg p-4">
            <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
              <span>Category</span>
              {category.image ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={`${import.meta.env.VITE_WEBSITE_URL}${category?.image}`}
                  alt={category?.en_name}
                />
              ) : (
                <BiSolidUserCircle className="h-10 w-10 rounded-full" />
              )}
            </h2>
            <div className="flex flex-col gap-4 py-2">
              <p>
                <strong className="pe-2">Arabic Name:</strong>{" "}
                {category.ar_name}
              </p>
              <p>
                <strong className="pe-2">English Name:</strong>{" "}
                {category.en_name}
              </p>
              <p>
                <strong className="pe-2">Description (English)</strong>{" "}
                {category.en_description}
              </p>
              <p>
                <strong className="pe-2">Description (Arabic)</strong>{" "}
                {category.ar_description}
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
