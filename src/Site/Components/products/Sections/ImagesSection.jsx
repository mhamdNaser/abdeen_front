import React, { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { useTranslation } from "../../../../provider/TranslationProvider";

export default function ImagesSection({ productid }) {
  const [images, setImages] = useState([]);
  const { translations } = useTranslation();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axiosClient
      .get(`/site/show-product-images/${productid}`)
      .then((response) => {
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  return (
    <>
      <section className="mb-8">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            {(translations && translations["Product Images"]) ||
              "Product Images"}
          </h2>

          <div className="flex xl:flex-row flex-col flex-wrap justify-start">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="xl:w-1/5 min-w-[240px] w-full p-2">
                  {image ? (
                    <div className="relative">
                      <img
                        src={`${image.url}`}
                        alt={`Product Image ${index + 1}`}
                        className="w-full h-40 rounded-lg shadow-md"
                      />
                    </div>
                  ) : (
                    <p className="text-center">
                      {(translations && translations["Image not available."]) ||
                        "Image not available."}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center">
                {(translations &&
                  translations["No images available for this product."]) ||
                  "No images available for this product."}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
