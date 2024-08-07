import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import BrandCategorySection from "../Components/products/Sections/BrandCategorySection";
import TagsSection from "../Components/products/Sections/TagsSection";
import ImagesSection from "../Components/products/Sections/ImagesSection";
import { useTranslation } from "../../provider/TranslationProvider";
import { BiSolidUserCircle, BiSolidEditAlt } from "react-icons/bi";

export default function SiteViewproduct() {
  const { translations } = useTranslation();
  const { id, name } = useParams();
  const [product, setproduct] = useState();
  const { setBackground, getCardProductNum } = useOutletContext();

  const saveproduct = () => {
    axiosClient.get(`site/show-product/${id}`).then((data) => {
      setproduct(data.data.product);
    });
  };

  const addToCart = (product) => {
    let cardsProducts = JSON.parse(localStorage.getItem("Card_products")) || [];

    let cartProductIndex = cardsProducts.findIndex(
      (item) => item.id === product.id
    );

    if (cartProductIndex !== -1) {
      // Product is already in the cart, increment its quantity
      cardsProducts[cartProductIndex].quantity += 1;
    } else {
      // Product is not in the cart, add it with quantity 1
      cardsProducts.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem("Card_products", JSON.stringify(cardsProducts));
    getCardProductNum();
  };

  useEffect(() => {
    saveproduct();
  }, []);

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true); // Cleanup function to reset the background when the component unmounts
  }, [setBackground]);

  return (
    <div className="flex xl:p-10 p-4 h-fit justify-center">
      <div className="flex flex-col xl:w-3/4 w-full text-center">
        <div className="md:flex py-10 gap-10">
          {!product ? (
            <Loading />
          ) : (
            <>
              <div className="xl:w-1/4 w-full text-dark">
                <section className="mb-8">
                  <div className="bg-blocks-color shadow-md rounded-lg p-4">
                    <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                      {(translations && translations["product Information"]) ||
                        "product Information"}
                    </h2>
                    {product && (
                      <div className="xl:flex flex-col gap-6 py-4">
                        <div className="flex flex-col relative gap-4">
                          {product.image ? (
                            <img
                              className="w-full mb-3"
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
                        <div className="flex flex-col gap-4">
                          <p className="flex justify-between">
                            <strong>
                              {(translations && translations["Sku"]) || "Sku"}
                              {" : "}
                            </strong>{" "}
                            {product.sku}
                          </p>
                          <p className="flex justify-between">
                            <strong>
                              {(translations && translations["Arabic Name"]) ||
                                "Arabic Name"}
                              {" : "}
                            </strong>{" "}
                            {product.ar_name}
                          </p>
                          <p className="flex justify-between">
                            <strong>
                              {(translations && translations["English Name"]) ||
                                "English Name"}
                              {" : "}
                            </strong>{" "}
                            {product.en_name}
                          </p>
                          <p className="flex justify-between">
                            <strong>
                              {(translations && translations["Status"]) ||
                                "Status"}
                              {" : "}
                            </strong>{" "}
                            {product.status === 1 ? "Active" : "Not Active"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
                <section className="mb-8">
                  <div className="bg-blocks-color shadow-md rounded-lg p-4">
                    <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                      {(translations && translations["Price"]) || "Price"}
                    </h2>
                    <div className="flex flex-col gap-4 py-2">
                      <p className="flex justify-between">
                        <strong>
                          {(translations && translations["Price"]) || "Price"}
                          {" : "}
                        </strong>
                        <span>
                          {parseFloat(product.public_price).toFixed(2)}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <strong>
                          {(translations && translations["Quantity"]) ||
                            "Quantity"}
                          {" : "}
                        </strong>
                        <span>{product.quantity}</span>
                      </p>
                    </div>
                  </div>
                </section>
                <section className="mb-8">
                  <div className="bg-blocks-color shadow-md rounded-lg p-4">
                    <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                      {(translations && translations["Discount"]) || "Discount"}
                    </h2>
                    <div className="flex flex-col gap-4 py-2">
                      <p className="flex justify-between">
                        <strong>
                          {(translations && translations["Discount"]) ||
                            "Discount"}
                          {" : "}
                        </strong>
                        <span>{product.discount} %</span>
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="xl:w-3/4 w-full text-dark">
                <ImagesSection productid={id} />
                <section className="mb-8">
                  <div className="bg-blocks-color shadow-md rounded-lg p-4">
                    <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                      {(translations && translations["product Description"]) ||
                        "product Description"}
                    </h2>
                    <div className="flex flex-col gap-4 py-2 text-start">
                      <p className="flex flex-col">
                        <strong>
                          {" "}
                          {(translations &&
                            translations["Description English"]) ||
                            "Description English"}
                          {" : "}
                        </strong>{" "}
                        {product.en_description}
                      </p>
                      <p className="flex flex-col">
                        <strong>
                          {(translations &&
                            translations["Description Arabic"]) ||
                            "Description Arabic"}
                          {" : "}
                        </strong>{" "}
                        {product.ar_description}
                      </p>
                    </div>
                  </div>
                </section>

                <BrandCategorySection product={product} />

                <TagsSection productid={product.id} saveproduct={saveproduct} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
