import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/Button";
// import AttributeSelect from "../components/AttributeSelect";
// import ColorSelect from "../components/ColorSelect";
import axiosClient from "../../../../axios-client";

export default function TagsSection({ productid }) {
  const [language, setLanguage] = useState(localStorage.getItem("LANGUAGE"));
  const [productTags, setProductTags] = useState([]);

  const saveProductTag = () => {
    axiosClient.get(`site/get-productTag/${productid}`).then((data) => {
      setProductTags(data.data.data);
    });
  };

  useEffect(() => {
    saveProductTag();
  }, []);

  const DeleteProductTag = (productTagId) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`admin/delete-productTag/${productTagId}`)
      .then((data) => {
        if (data.success === false) {
          toast.update(id, {
            type: "error",
            render: data.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          saveProductTag();
          toast.update(id, {
            type: "success",
            render: data.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        toast.update(id, {
          type: "error",
          render: err.response.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      });
  };
  return (
    <div>
      <section className="mb-8 p-4 bg-blocks-color rounded-lg">
        <h2 className="text-2xl border-b py-3 font-semibold">Product Tags</h2>
        <div className="flex flex-col gap-y-3 bg-gray-100 p-4 rounded-lg shadow-md">
          {productTags.map((productTag) => (
            <div
              key={productTag.id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              {/* Tag Color Display */}
              {productTag.en_attribute.toUpperCase() === "COLOR" && (
                <div
                  className={`p-2 text-gray-100 rounded-lg mb-2`}
                  style={{
                    backgroundColor: productTag.tag_en_description,
                  }}
                >
                  <div className="font-semibold">
                    {productTag.tag_en_description}
                  </div>
                </div>
              )}
              {/* Attribute and Name */}
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold">{productTag.en_attribute}</div>
                <div className="text-gray-600">{productTag.ar_attribute}</div>
              </div>
              {/* Tag Name */}
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold">{productTag.tag_en_name}</div>
                <div className="text-gray-600">{productTag.tag_ar_name}</div>
              </div>
              {/* Description */}
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold">
                  {productTag.tag_en_description}
                </div>
                <div className="text-gray-600">
                  {productTag.tag_ar_description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
