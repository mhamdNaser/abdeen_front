import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function EditCategory({
  data,
  getCategories,
  setIsModalOpen,
  categories,
  getCategorieslist,
}) {
  const [image, setImage] = useState(data?.image);
  const { translations, language } = useTranslation();
  const [direction, setDirection] = useState(language === "ar" ? "rtl" : "ltr");

  let template = {
    title: "Edit Category",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[100px] h-[100px]",
      },
      {
        title: "English Name",
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
        title: "Arabic Name",
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
        name: "parent_id",
        title: "select the parent category",
        type: "select",
        options: [...categories],
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        optionText: language === "ar" ? "ar_name" : "en_name",
        value: data?.parent_id,
        optionValue: "id",
      },
      {
        title: "English Description",
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
        title: "Arabic Description",
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
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    const formData = new FormData();
    formData.append("en_name", values.en_name);
    formData.append("ar_name", values.ar_name);
    formData.append("en_description", values.en_description);
    formData.append("ar_description", values.ar_description);
    formData.append("parent_id", parseInt(values.parent_id));
    formData.append("image", image);

    axiosClient
      .post(`/admin/update-category/${data?.id}`, formData)
      .then((res) => {
        if (res.data.success === false) {
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
          getCategories();
          getCategorieslist();
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
      image={image}
      setImage={setImage}
    />
  );
}
