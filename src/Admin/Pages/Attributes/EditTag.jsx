import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function EditTag({ attid ,data, getTags, setIsModalOpen }) {
    const [color, setColor] = useColor(data?.description);
    const [image, setImage] = useState();

  let template = {
    title: "add admin",
    fields: [
      {
        title: "name",
        name: "name",
        type: "text",
        value: data?.name,
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
    formData.append("name", values.name);
    formData.append("description", color.hex);
    formData.append("attribute_id", attid);

    axiosClient
      .post(`/admin/update-tag/${data?.id}`, formData)
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
          getTags();
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
    <div className="p-5">
      <h1 className="font-bold text-2xl bt-3 pb-3">Edit Tags</h1>
      <ColorPicker
        height={128}
        color={color}
        onChange={setColor}
        hideHSV
        dark
      />
      <ReusableForm
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"add"}
        addedStyles={"md:w-[400px] lg:w-[800px]"}
        image={image}
        setImage={setImage}
      />
    </div>
  );
}
