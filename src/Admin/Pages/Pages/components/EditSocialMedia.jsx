import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../components/ReusableForm";
import { useTranslation } from "../../../../provider/TranslationProvider";

export default function EditSocialMedia({
  getSocialMedia,
  setIsModalOpen,
  data,
}) {
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const { translations, language } = useTranslation();
  const [direction, setDirection] = useState(language === "ar" ? "rtl" : "ltr");

  const handleSelectChange = (name, value) => {
    if (name === "country_id") {
      const filteredStates = states.filter(
        (state) => state.country_id == value
      );
      setStateOptions(filteredStates);
      console.log(value);
    } else if (name === "state_id") {
      const filteredCities = cities.filter((city) => city.state_id == value);
      setCityOptions(filteredCities);
    } else {
      console.log(name, value);
    }
  };

  let template = {
    title: "Edit Social Media",
    fields: [
      {
        title: "Link",
        name: "link",
        type: "text",
        value: data.link,
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
    formData.append("link", values.link);

    axiosClient
      .post(`admin/update-socialmedia/${data?.id}`, formData)
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
          getSocialMedia();
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
      onSelectChange={handleSelectChange}
    />
  );
}
