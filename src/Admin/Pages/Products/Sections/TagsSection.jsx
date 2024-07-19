import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../components/Button";
import AttributeSelect from "../components/AttributeSelect";
import ColorSelect from "../components/ColorSelect";
import axiosClient from "../../../../axios-client";

export default function TagsSection({ saveProduct, Productid }) {
  const [language, setLanguage] = useState(localStorage.getItem("LANGUAGE"));
  const [productTags, setProductTags] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({
    tag_id: {},
    product_id: {},
    price: 0,
  });

  const handleChangeAttribute = (selectedId) => {
    axiosClient.get(`/admin/all-tags-id/${selectedId}`).then((res) => {
      setTags(res.data.data);
    });
  };

  const getAttributs = () => {
    axiosClient.get(`admin/all-attributes`).then((data) => {
      setAttributes(data.data.data);
    });
  };

  const saveProductTag = () => {
    axiosClient.get(`admin/get-productTag/${Productid}`).then((data) => {
      setProductTags(data.data.data);
    });
  };

  useEffect(() => {
    setTag({ ...tag, product_id: Productid });
    saveProductTag();
    getAttributs();
  }, []);

  const options = tags.map((tag, index) => ({
    value: tag.id,
    label: `${tag.en_name} { ${tag.ar_name} }`,
    color: language === "ar" ? tag.ar_description : tag.en_description,
    attribute: tag.attribute.toUpperCase(),
  }));

  const SaveTags = () => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .post("admin/store-productTag", tag)
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
        <h2 className="text-2xl border-b py-3 font-semibold">Attributes</h2>
        <div className="flex">
          <div className="w-1/2">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Product Tags</h2>
              <div className="grid grid-cols-1 gap-4">
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
                      <div className="font-semibold">
                        {productTag.en_attribute}
                      </div>
                      <div className="text-gray-600">
                        {productTag.ar_attribute}
                      </div>
                    </div>
                    {/* Tag Name */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">
                        {productTag.tag_en_name}
                      </div>
                      <div className="text-gray-600">
                        {productTag.tag_ar_name}
                      </div>
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
                    <Button
                      isLink={false}
                      color={"bg-redColor text-gray-100 w-fit"}
                      title={"Delete"}
                      onClickFun={() => DeleteProductTag(productTag.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/2 border-l px-4">
            <div className="py-3 bg-gray-100 mt-4">
              <h2 className="text-xl font-semibold px-3">
                Add New Tag For Product
              </h2>
            </div>
            <div className="py-4">
              {/* Replace AttributeSelect and ColorSelect with your components */}
              {/* Example placeholder for AttributeSelect */}
              <div className="py-4">
                <AttributeSelect
                  attributes={attributes}
                  onSelectAttribute={handleChangeAttribute}
                />
              </div>
            </div>
            <div className="py-4">
              {/* Example placeholder for ColorSelect */}
              <div className="py-4">
                <ColorSelect
                  options={options}
                  onChange={(selectedOption) => {
                    setTag({ ...tag, tag_id: selectedOption.value });
                  }}
                />
              </div>
            </div>
            <div className="py-4">
              {/* Additional Charge Input */}
              <span className="text-gray-500 block mb-2">
                Please confirm if there is an additional charge associated with
                this tag.
              </span>
              <input
                type="number"
                defaultValue={0}
                className="input-box w-full"
                onChange={(ev) => {
                  const value = parseInt(ev.target.value);
                  if (!isNaN(value)) {
                    setTag({
                      ...tag,
                      price: value,
                    });
                  }
                }}
              />
            </div>
            {/* Save Button */}
            <Button
              isLink={false}
              color={"bg-blue-500 text-gray-100"}
              title={"Save"}
              onClickFun={SaveTags}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
