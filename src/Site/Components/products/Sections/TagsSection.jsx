import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/Button";
// import AttributeSelect from "../components/AttributeSelect";
// import ColorSelect from "../components/ColorSelect";
import axiosClient from "../../../../axios-client";
import { useTranslation } from "../../../../provider/TranslationProvider";

export default function TagsSection({ productid }) {
  const [productTags, setProductTags] = useState([]);
    const { translations, language } = useTranslation();

  const saveProductTag = () => {
    axiosClient.get(`site/get-productTag/${productid}`).then((data) => {
      setProductTags(data.data.data);
    });
  };

  useEffect(() => {
    saveProductTag();
  }, []);


  return (
    <div>
      <section className="mb-8 p-4 bg-blocks-color rounded-lg">
        <h2 className="text-2xl text-start border-b py-3 font-semibold">
          {(translations && translations["Product Tags"]) || "Product Tags"}
        </h2>
        <div className="flex flex-col gap-y-3 bg-gray-100 p-4 rounded-lg shadow-md">
          {productTags.map((productTag) => (
            <div
              key={productTag.id}
              className="flex justify-between bg-white rounded-lg shadow-md"
            >
              {/* Tag Color Display */}
              {productTag.en_attribute.toUpperCase() === "COLOR" ? (
                <div className="flex gap-3">
                  <div
                    className={`text-gray-100 w-8`}
                    style={{
                      backgroundColor: productTag.tag_en_description,
                    }}
                  >
                  </div>
                  <div className="flex justify-between items-center mb-2 p-2">
                    <div className="font-semibold">
                      {language === "ar"
                        ? productTag.ar_attribute
                        : productTag.en_attribute}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center mb-2 p-2">
                  <div className="font-semibold">
                    {language === "ar"
                      ? productTag.ar_attribute
                      : productTag.en_attribute}
                  </div>
                </div>
              )}
              {/* Attribute and Name */}

              {/* Tag Name */}
              <div className="flex justify-between items-center mb-2 p-2">
                <div className="font-semibold">
                  {language === "ar"
                    ? productTag.tag_ar_name
                    : productTag.tag_en_name}
                </div>
              </div>
              {/* Description */}
              <div className="flex justify-between items-center mb-2 p-2">
                <div className="font-semibold">
                  {language === "ar"
                    ? productTag.tag_ar_description
                    : productTag.tag_en_description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
