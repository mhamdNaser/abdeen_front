import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../components/ReusableForm";
import { useTranslation } from "../../../../provider/TranslationProvider";

export default function EditDelivery({
  getDelivery,
  setIsModalOpen,
  data,
  countries,
  states,
  cities,
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
    title: "edit delivery",
    fields: [
      {
        title: "Cost",
        name: "cost",
        type: "text",
        value: data.cost,
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
        title: "select the country",
        type: "select",
        options: [...countries],
        optionText: "name",
        optionValue: "id",
        styles: "lg:w-[48%]",
      },
      {
        name: "state_id",
        title: "select the state",
        type: "select",
        options: stateOptions,
        optionText: "name",
        optionValue: "id",
        styles: "lg:w-[48%]",
      },
      {
        name: "city_id",
        title: "select the city",
        type: "select",
        options: cityOptions,
        optionText: "name",
        optionValue: "id",
        styles: "lg:w-[48%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    const formData = new FormData();
    formData.append("cost", values.cost);
    formData.append("country_id", values.country_id);
    formData.append("state_id", values.state_id);
    formData.append("city_id", values.city_id);

    axiosClient
      .post(`admin/update-delivery/${data?.id}`, formData)
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
          getDelivery();
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
