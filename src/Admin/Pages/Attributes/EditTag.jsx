import { toast } from "react-toastify";
import { useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function EditTag({ attid ,data, getTags, setIsModalOpen }) {
  const [color, setColor] = useColor(data?.en_description);
  const [image, setImage] = useState();
  const [ardescriptionText, setArDescriptionText] = useState("");
  const [endescriptionText, setEnDescriptionText] = useState("");


  let template = {
    title: "add tag",
    fields: [
      {
        title: "English name",
        name: "en_name",
        type: "text",
        value: data?.en_name,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "Arabic name",
        name: "ar_name",
        type: "text",
        value: data?.ar_name,
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
    formData.append("en_name", values.en_name);
    formData.append("ar_name", values.ar_name);
    if (data?.attribute.toUpperCase() === "COLOR") {
      formData.append("en_description", color.hex);
      formData.append("ar_description", color.hex);
    } else {
      formData.append("en_description", endescriptionText || null);
      formData.append("ar_description", ardescriptionText || null);
    }
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
      {data?.attribute.toUpperCase() === "COLOR" ? (
        <ColorPicker
          height={128}
          color={color}
          onChange={setColor}
          hideHSV
          dark
        />
      ) : (
        <>
          <div>
            <label htmlFor="description">English Description</label>
            <textarea
              className="input-box w-full"
              type="text"
              defaultValue={data?.en_description}
              name="en_description"
              id="description"
              onChange={(e) => setEnDescriptionText(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Arabic Description</label>
            <textarea
              className="input-box w-full"
              type="text"
              defaultValue={data?.ar_description}
              name="ar_description"
              id="description"
              onChange={(e) => setArDescriptionText(e.target.value)}
            />
          </div>
        </>
      )}
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
