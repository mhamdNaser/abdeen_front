import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Button from "../../../components/Button";
import { BiSolidPalette } from "react-icons/bi";

export default function AddTag({ attid, getTags, setIsAddModalOpen }) {
  const [color, setColor] = useColor("hex", "#121212");
  const [colorpicker, setColorPicker] = useState(false);

  const showColorPicker = () => {
    setColorPicker(!colorpicker);
  };

  let template = {
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
      .post("/admin/store-tag", formData)
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
          getTags();
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
    <div className="p-5">
      <h1 className="font-bold text-2xl bt-3 pb-3">Add Tags</h1>
      <div className="flex py-3">
        <Button
          isLink={false}
          color={"bg-blueColor text-xl text-white px-2"}
          Icon={<BiSolidPalette />}
          onClickFun={showColorPicker}
        />
      </div>
      {colorpicker && (
        <ColorPicker
          height={128}
          color={color}
          onChange={setColor}
          hideHSV
          dark
        />
      )}
      <ReusableForm
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"add"}
        addedStyles={"md:w-[400px] lg:w-[800px]"}
      />
    </div>
  );
}
