import React, { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { useTranslation } from "../../../../provider/TranslationProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/virtual";
import "swiper/css/effect-cards";
import {
  EffectCoverflow,
  Pagination,
  Virtual,
  EffectCards,
} from "swiper/modules";

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

          <div className="text-center flex-wrap m-auto items-center py-5">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              initialSlide={1}
              centeredSlides={true}
              slidesPerView={3}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Pagination, Virtual]}
              className="mySwiper"
              Virtual
            >
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div key={index} className="container m-auto">
                    {image ? (
                      <SwiperSlide className="px-2">
                        <div className="min-w-30 max-w-30 min-h-30 max-h-30 rounded-lg shadow-md">
                          <img
                            src={`${image.url}`}
                            alt={`Product Image ${index + 1}`}
                            className="min-w-[130px] max-w-[130px] min-h-[130px] max-h-[130px]"
                          />
                        </div>
                      </SwiperSlide>
                    ) : (
                      <p className="text-center">
                        {(translations &&
                          translations["Image not available."]) ||
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
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
