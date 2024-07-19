import { toast } from "react-toastify";
import { useState } from "react";
import ReusableForm from "../../../../components/ReusableForm";
import axiosClient from "../../../../axios-client";

export default function EditInformation({
  data,
  getProduct,
  setIsModalOpen,
}) {
  const [image, setImage] = useState(data?.image);

  let template = {
    title: "Edit Information Product",
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
      }
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("sku", values.sku);
    formData.append("en_name", values.en_name);
    formData.append("ar_name", values.ar_name);

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
