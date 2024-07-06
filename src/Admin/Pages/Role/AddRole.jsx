import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";

export default function AddRole({ getRoles, setIsAddModalOpen }) {
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
      console.log(filteredCities);
    } else {
      console.log(name, value);
    }
  };

  let template = {
    title: "add admin",
    fields: [
      {
        title: "name",
        name: "name",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    const formData = new FormData();
    formData.append("name", values.name);

    axiosClient
      .post("/admin/store-role", formData)
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
          getRoles();
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
}
