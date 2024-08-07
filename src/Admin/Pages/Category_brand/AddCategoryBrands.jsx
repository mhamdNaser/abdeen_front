import React, { useState } from "react";
import ReusableForm from "../../../components/ReusableForm";
import { useTranslation } from "../../../provider/TranslationProvider";
import { toast } from "react-toastify";
import axiosClient from "../../../axios-client";
import { useCategoryBrand } from "../../../provider/CategoryBrandProvider";

export default function AddCategoryBrands({
  brands,
  categoryId,
  setIsAddModalOpen,
  addItem,
}) {
  const { translations, language } = useTranslation();
  const [direction, setDirection] = useState(language === "ar" ? "rtl" : "ltr");

  let template = {
    title: "add Category",
    fields: [
      {
        name: "brands",
        title: "select the parent Brands",
        type: "select",
        options: [...brands],
        validationProps: {
          required: {
            value: false,
            message: "this field is required",
          },
        },
        optionText: language === "ar" ? "ar_name" : "en_name",
        optionValue: "id",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    const formData = new FormData();

    formData.append("brand_id", parseInt(values.brands));
    formData.append("category_id", categoryId);

    axiosClient
      .post("/admin/store-brand-category", formData)
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
          setIsAddModalOpen((prev) => !prev);
          addItem(data.data.newItem);
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

  const validate = () => {};
  return (
    <ReusableForm
      translations={translations}
      direction={direction}
      template={template}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-full"}
      btnText={"add"}
      addedStyles={"md:w-[400px] lg:w-[800px]"}
    />
  );
}
