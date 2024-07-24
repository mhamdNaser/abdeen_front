import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";

export default function EditProduct({
  data,
  brands,
  categories,
  language,
  getProduct,
  setIsModalOpen,
}) {
  const [image, setImage] = useState(data?.image);

  let template = {
    title: "Edit Product",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[100px] h-[100px]",
      },
      {
        title: "sku",
        name: "sku",
        type: "text",
        value: data?.sku,
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
        value: data?.en_name,
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
        value: data?.ar_name,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "English description",
        name: "en_description",
        type: "textArea",
        value: data?.en_description,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "cost Price",
        name: "cost_Price",
        type: "number",
        value: parseFloat(data?.cost_Price).toFixed(2),
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
        type: "number",
        value: parseFloat(data?.public_price).toFixed(2),
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
        value: data?.quantity,
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
        value: data?.ar_description,
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
    formData.append("cost_Price", values.cost_Price);
    formData.append("public_price", values.public_price);
    formData.append("quantity", values.quantity);
    formData.append("category_id", parseInt(values.category_id));
    formData.append("brand_id", parseInt(values.brand_id));

    console.log(formData);
    axiosClient
      .post(`/admin/update-product/${data?.id}`, formData)
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
          getProduct();
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
      template={template}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-full"}
      btnText={"add"}
      addedStyles={"md:w-[400px] lg:w-[800px]"}
      image={image}
      setImage={setImage}
      // onSelectChange={handleSelectChange}
    />
  );
}
