import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router-dom";
import ReusableForm from "../../../components/ReusableForm";
import { useLocation } from "../../../provider/LocationProvider";

export default function EditProfileAddress({data, getUser, setIsModalOpen }) {
  const { id, name } = useParams();
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const { countries, states, cities } = useLocation();

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
  
  let template = {
    title: "edit address details",
    fields: [
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
      },
      {
        name: "address_1",
        title: "insert the address_1",
        value: data.address_1,
        type: "text",
        optionText: "name",
        optionValue: "id",
      },
      {
        name: "address_2",
        title: "insert the address_2",
        value: data.address_2,
        type: "text",
        optionText: "name",
        optionValue: "name",
      },
      {
        name: "address_3",
        title: "insert the address_3",
        value: data.address_3,
        type: "text",
        optionText: "name",
        optionValue: "name",
      },
    ],
  };

  const onSubmit = async (values) => {
    const Id = toast.loading("submitting, please wait...");
    const data = {
      country_id: parseInt(values.country_id),
      state_id: parseInt(values.state_id),
      city_id: parseInt(values.city_id),
      address_1: values.address_1,
      address_2: values.address_2,
      address_3: values.address_3,
    };
    axiosClient
      .post(`/admin/update-user/${id}`, data)
      .then((res) => {
        if (res.data.success == true) {
          setIsModalOpen((prev) => !prev);
          getUser(res.data.User);
          toast.update(Id, {
            type: "success",
            render: res.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          toast.update(Id, {
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
        toast.update(Id, {
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
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"edit"}
        addedStyles={"md:w-[400px] lg:w-[500px]"}
        onSelectChange={handleSelectChange}
      />
    </>
  );
}
