import React , { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../components/ReusableForm";
import { useTranslation } from "../../../../provider/TranslationProvider";

export default function EditTax({ getTax, setIsModalOpen, data }) {
  const { translations, language } = useTranslation();
  const [direction, setDirection] = useState(language === "ar" ? "rtl" : "ltr");

  let template = {
    title: "Edit Tax",
    fields: [
      {
        title: "Tax",
        name: "tax",
        type: "text",
        value: data.tax,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    const formData = new FormData();
    formData.append("tax", parseFloat(values.tax));

    axiosClient
      .post(`admin/update-tax/${data?.id}`, formData)
      .then((res) => {
        if (res.success === false) {
          toast.update(id, {
            type: "error",
            render: res.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          getTax();
          setIsModalOpen((prev) => !prev);
          toast.update(id, {
            type: "success",
            render: res.data.message,
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
      direction={direction}
      translations={translations}
      template={template}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-full"}
      btnText={"add"}
      addedStyles={"md:w-[400px] lg:w-[800px]"}
    />
  );
}
