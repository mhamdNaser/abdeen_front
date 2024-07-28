import { toast } from "react-toastify";
import { useState } from "react";
import ReusableForm from "../../../components/ReusableForm";
import axiosClient from "../../../axios-client";
import { useTranslation } from "../../../provider/TranslationProvider";

export const EditUser = ({ data, getUsers, setIsModalOpen }) => {
  const [image, setImage] = useState(data?.image);
    const { translations, language } = useTranslation();
    const [direction, setDirection] = useState(
      language === "ar" ? "rtl" : "ltr"
  );
  
  console.log(data.id);
  let template = {
    title: "edit user details",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[100px] h-[100px]",
      },
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
      {
        title: "UserName",
        name: "username",
        type: "text",
        value: data.username,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[100%]",
      },
      {
        title: "Email",
        name: "email",
        value: data.email,
        type: "email",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[100%]",
      },
      {
        title: "Phone",
        name: "phone",
        value: data.phone,
        type: "number",
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
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("password", values.password);
    if (typeof values?.image !== "string") {
      formData.append("image", image);
    }
    console.log(values.name);
    axiosClient
      .post(`/admin/update-user/${data.id}`, formData)
      .then((res) => {
        if (res.data.success == true) {
          getUsers();
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
};
