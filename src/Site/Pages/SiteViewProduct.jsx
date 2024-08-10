import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import BrandCategorySection from "../Components/products/Sections/BrandCategorySection";
import TagsSection from "../Components/products/Sections/TagsSection";
import ImagesSection from "../Components/products/Sections/ImagesSection";
import { useTranslation } from "../../provider/TranslationProvider";
import { BiSolidUserCircle, BiSolidEditAlt } from "react-icons/bi";

export default function SiteViewproduct({ productdetails, getCardProductNum }) {
  const { translations, language } = useTranslation();
  const [product, setproduct] = useState(productdetails);

  // const saveproduct = () => {
  //   axiosClient.get(`site/show-product/${productdetails?.id}`).then((data) => {
  //     setproduct(data.data.product);
  //   });
  // };

  const addToCart = (product) => {
    let cardsProducts = JSON.parse(localStorage.getItem("Card_products")) || [];

    let cartProductIndex = cardsProducts.findIndex(
      (item) => item.id === product.id
    );

    if (cartProductIndex !== -1) {
      // Product is already in the cart, increment its quantity
      cardsProducts[cartProductIndex].quantity += 1;
    } else {
      cardsProducts.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem("Card_products", JSON.stringify(cardsProducts));
    getCardProductNum();
  };

  // useEffect(() => {
  //   saveproduct();
  // }, []);

  return (
    <div className="flex xl:p-10 p-4 h-fit justify-center">
      <div className="flex flex-col xl:w-3/4 w-full text-center">
        <div className="md:flex py-10 gap-10">
          {!product ? (
            <Loading />
          ) : (
            <>
              <div className="w-full text-dark">
                <section className="mb-8">
                  <div className="bg-blocks-color shadow-md rounded-lg p-4">
                    <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                      {(translations && translations["product Information"]) ||
                        "product Information"}
                    </h2>
                    {product && (
                      <div className="flex items-end gap-6 py-4">
                        <div className="flex flex-col w-1/3 relative gap-4">
                          {product.image ? (
                            <img
                              className="w-full max-h-40 min-h-40 mb-3"
                              src={`${import.meta.env.VITE_WEBSITE_URL}${
                                product.image
                              }`}
                              alt={product.en_name}
                            />
                          ) : (
                            <BiSolidUserCircle className="h-40 w-40" />
                          )}
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-redColor py-2 absolute bottom-0 w-full"
                          >
                            {(translations && translations["Add to Cart"]) ||
                              "Add to Cart"}
                          </button>
                        </div>
                        <div className="flex flex-col w-1/2 gap-1">
                          <p className="flex justify-between">
                            <strong>
                              {(translations && translations["Sku"]) || "Sku"}
                              {" : "}
                            </strong>{" "}
                            {product.sku}
                          </p>
                          <p className="flex justify-between">
                            <strong>
                              {(translations && translations["Name"]) || "Name"}
                              {" : "}
                            </strong>{" "}
                            {language === "ar"
                              ? product.ar_name
                              : product.en_name}
                          </p>
                          <p className="flex justify-between">
                            <strong>
                              {(translations && translations["Brand"]) ||
                                "Brand"}
                              {" : "}
                            </strong>{" "}
                            {language === "ar"
                              ? product.ar_brand
                              : product.en_brand}
                          </p>
                          <p className="flex justify-between">
                            <strong>
                              {(translations && translations["Category"]) ||
                                "Category"}
                              {" : "}
                            </strong>{" "}
                            {language === "ar"
                              ? product.ar_category
                              : product.en_category}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
                <ImagesSection productid={productdetails?.id} />
                <section className="mb-8">
                  <div className="bg-blocks-color shadow-md rounded-lg p-4">
                    <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                      {(translations && translations["Description"]) ||
                        "Description"}
                    </h2>
                    <div className="flex flex-col gap-4 py-2 text-start">
                      <p className="flex">
                        {language === "ar"
                          ? product.ar_description
                          : product.en_description}
                      </p>
                    </div>
                  </div>
                </section>

                <TagsSection productid={product.id} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
