import React, { useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import axiosClient from "../../../../axios-client";
import { useTranslation } from "../../../../provider/TranslationProvider";

export default function BrandCategorySection({ product }) {
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const { translations } = useTranslation();

  const saveBrand = () => {
    axiosClient.get(`site/show-brand/${product.en_brand}`).then((data) => {
      setBrand(data.data.brand);
    });
  };

  const saveCategory = () => {
    axiosClient
      .get(`site/show-category/${product.en_category}`)
      .then((data) => {
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
              <span>{(translations && translations["Brand"]) || "Brand"}</span>
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
            <div className="flex flex-col gap-4 py-2 text-start">
              <p>
                <strong className="pe-2">
                  {(translations && translations["Arabic Name"]) ||
                    "Arabic Name"}
                  {" : "}
                </strong>{" "}
                {brand.ar_name}
              </p>
              <p>
                <strong className="pe-2">
                  {(translations && translations["English Name"]) ||
                    "English Name"}
                  {" : "}
                </strong>{" "}
                {brand.en_name}
              </p>
              <p>
                <strong className="pe-2">
                  {(translations && translations["Description English"]) ||
                    "Description English"}
                  {" : "}
                </strong>{" "}
                {brand.en_description}
              </p>
              <p>
                <strong className="pe-2">
                  {(translations && translations["Description Arabic"]) ||
                    "Description Arabic"}
                  {" : "}
                </strong>{" "}
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
              <span>
                {(translations && translations["Category"]) || "Category"}
              </span>
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
            <div className="flex flex-col gap-4 py-2 text-start">
              <p>
                <strong className="pe-2">
                  {" "}
                  {(translations && translations["Arabic Name"]) ||
                    "Arabic Name"}
                  {" : "}
                </strong>{" "}
                {category.ar_name}
              </p>
              <p>
                <strong className="pe-2">
                  {(translations && translations["English Name"]) ||
                    "English Name"}
                  {" : "}
                </strong>{" "}
                {category.en_name}
              </p>
              <p>
                <strong className="pe-2">
                  {(translations && translations["Description English"]) ||
                    "Description English"}
                  {" : "}
                </strong>{" "}
                {category.en_description}
              </p>
              <p>
                <strong className="pe-2">
                  {(translations && translations["Description Arabic"]) ||
                    "Description Arabic"}
                  {" : "}
                </strong>{" "}
                {category.ar_description}
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
