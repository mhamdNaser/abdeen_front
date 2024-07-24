import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";

export default function AddProduct({
  getProduct,
  setIsAddModalOpen,
  brands,
  categories,
  language,
}) {
  const [image, setImage] = useState();

  let template = {
    title: "add Product",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        validationProps: {
          required: {
            value: true,
            message: "please choose a profile image first",
          },
        },
        required: { value: true, message: "please set an image first" },
        imgStyle: "w-[100px] h-[100px]",
      },
      {
        title: "sku",
        name: "sku",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "English name",
        name: "en_name",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "Arabic name",
        name: "ar_name",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "cost Price",
        name: "cost_Price",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "public price",
        name: "public_price",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "quantity",
        name: "quantity",
        type: "number",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "English description",
        name: "en_description",
        type: "textArea",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "Arabic description",
        name: "ar_description",
        type: "textArea",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        name: "category_id",
        title: "select the category",
        type: "select",
        options: [...categories],
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        optionText: language === "ar" ? "ar_name" : "en_name",
        optionValue: "id",
        styles: "lg:w-[48%]",
      },
      {
        name: "brand_id",
        title: "select the brand",
        type: "select",
        options: [...brands],
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        optionText: language === "ar" ? "ar_name" : "en_name",
        optionValue: "id",
        styles: "lg:w-[48%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("sku", values.sku);
    formData.append("en_name", values.en_name);
    formData.append("ar_name", values.ar_name);
    formData.append("en_description", values.en_description);
    formData.append("ar_description", values.ar_description);
    formData.append("cost_Price", parseFloat(values.cost_Price));
    formData.append("public_price", parseFloat(values.public_price));
    formData.append("quantity", values.quantity);
    formData.append("category_id", parseInt(values.category_id));
    formData.append("brand_id", parseInt(values.brand_id));

    axiosClient
      .post("/admin/store-product", formData)
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
          getProduct();
          setIsAddModalOpen((prev) => !prev);
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
      template={template}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-full"}
      btnText={"add"}
      addedStyles={"md:w-[400px] lg:w-[800px]"}
      image={image}
      setImage={setImage}
    />
  );
}
