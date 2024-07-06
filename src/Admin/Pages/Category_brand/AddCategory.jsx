import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";

export default function AddCategory({ getCategories, setIsAddModalOpen, categories }) {
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
      // {
      //   name: "image",
      //   type: "file",
      //   styles: "w-[100%] items-center justify-center",
      //   fileFor: "image",
      //   validationProps: {
      //     required: {
      //       value: true,
      //       message: "please choose a profile image first",
      //     },
      //   },
      //   required: { value: true, message: "please set an image first" },
      //   imgStyle: "w-[100px] h-[100px]",
      // },
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
      {
        name: "parent_id",
        title: "select the parent",
        type: "select",
        options: [...categories],
        validationProps: {
          required: {
            value: false,
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
    if (Number.isInteger(parseInt(values.parent_id))) {
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("parent_id", parseInt(values.parent_id));
    } else { 
       formData.append("name", values.name);
       formData.append("description", values.description);
    }

    axiosClient
      .post("/admin/store-category", formData)
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
          getCategories();
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
