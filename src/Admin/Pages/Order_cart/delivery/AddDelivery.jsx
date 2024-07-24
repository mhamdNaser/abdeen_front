import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../components/ReusableForm";

export const AddDelivery = ({
  getAdmins,
  setIsAddModalOpen,
  countries,
  states,
  cities,
}) => {
  const [image, setImage] = useState();
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

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
    title: "add delivery",
    fields: [
      {
        title: "cost",
        name: "cost",
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
      .post("/admin/store-delivery", formData)
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
          getAdmins();
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
      onSelectChange={handleSelectChange}
    />
  );
};
