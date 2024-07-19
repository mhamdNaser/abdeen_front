import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReusableForm from "../../../components/ReusableForm";
import { useStateContext } from "../../../provider/ContextsProvider";
import axiosClient from "../../../axios-client";

export default function Register({ setSingupModalOpen }) {
  const { token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const handleSelectChange = (name, value) => {
    if (name === "country_id") {
      const filteredStates = states.filter(
        (state) => state.country_id == value
      );
      setStateOptions(filteredStates);
    } else if (name === "state_id") {
      const filteredCities = cities.filter((city) => city.state_id == value);
      setCityOptions(filteredCities);
    } else {
      console.log(name, value);
    }
  };

  const getCountries = async () => {
    const res = await axiosClient.get("/site/all-countries");
    setCountries(res?.data.data);
  };
  const getStates = async () => {
    const res = await axiosClient.get("/site/all-states");
    setStates(res?.data.data);
  };
  const getCities = async () => {
    const res = await axiosClient.get("/site/all-cities");
    setCities(res?.data.data);
  };

  useEffect(() => {
    getCountries();
    getStates();
    getCities();
  }, []);

  const onSubmit = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("medium_name", values.medium_name);
    formData.append("last_name", values.last_name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("password", values.password);
    formData.append("image", image);
    formData.append("country_id", values.country_id);
    formData.append("state_id", values.state_id);
    formData.append("city_id", values.city_id);

    axiosClient
      .post("/site/singup", formData)
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
          setSingupModalOpen((prev) => !prev);
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

  let template = {
    title: "SingUp",
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
        title: "First name",
        name: "first_name",
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
        title: "Medium name",
        name: "medium_name",
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
        title: "Last name",
        name: "last_name",
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
        title: "Username",
        name: "username",
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
        title: "email",
        name: "email",
        type: "email",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "Phone",
        name: "phone",
        type: "number",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "password",
        name: "password",
        type: "password",
        autocomplete: "off",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        name: "country_id",
        title: "select the country",
        type: "select",
        options: [...countries],
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
        name: "state_id",
        title: "select the state",
        type: "select",
        options: stateOptions,
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
        name: "city_id",
        title: "select the city",
        type: "select",
        options: cityOptions,
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
    ],
  };

  return (
    <ReusableForm
      template={template}
      onSubmit={onSubmit}
      validate={validate}
      image={image}
      setImage={setImage}
      btnText={"Singup"}
      btnWidth={"w-[150px]"}
      onSelectChange={handleSelectChange}
    />
  );
}
