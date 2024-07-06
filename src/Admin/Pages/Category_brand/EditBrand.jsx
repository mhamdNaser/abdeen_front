import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";

export default function EditBrand({ data, getBrands, setIsModalOpen, countries }) {
  const [image, setImage] = useState(data?.image);

  let template = {
    title: "add admin",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[100px] h-[100px]",
      },
      {
        title: "name",
        name: "name",
        type: "text",
        value: data?.name,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        name: "country_id",
        title: "made in",
        type: "select",
        options: [...countries],
        value: data?.country_id,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        optionText: "name",
        optionValue: "id",
        styles: "lg:w-[48%]",
      },
      {
        title: "description",
        name: "description",
        type: "textArea",
        value: data?.description,
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
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("country_id", parseInt(values.country_id));
    formData.append("image", image);

    console.log(formData);
    axiosClient
      .post(`/admin/update-brand/${data?.id}`, formData)
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
          getBrands();
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
