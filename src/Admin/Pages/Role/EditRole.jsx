import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function EditRole({ data, getRoles, setIsModalOpen }) {
  const [image, setImage] = useState(data?.image);
   const { translations, language } = useTranslation();
   const [direction, setDirection] = useState(
     language === "ar" ? "rtl" : "ltr"
  );
  
  let template = {
    title: "edit role",
    fields: [
      {
        title: "Name",
        name: "name",
        type: "text",
        value: data.name,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[100%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("submitting, please wait...");
    const formData = new FormData();
    formData.append("name", values.name);

    axiosClient
      .post(`/admin/update-role/${data.id}`, formData)
      .then((res) => {
        if (res.data.success == true) {
          getRoles();
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
        } else {
          toast.update(id, {
            type: "error",
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
        console.log(err);
        toast.update(id, {
          type: "success",
          render: err.response.data.mes,
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
    <>
      <ReusableForm
        translations={translations}
        direction={direction}
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"edit"}
        addedStyles={"md:w-[400px] lg:w-[500px]"}
        image={image}
        setImage={setImage}
      />
    </>
  );
}
