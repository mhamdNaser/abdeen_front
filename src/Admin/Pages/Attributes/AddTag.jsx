import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../components/ReusableForm";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Button from "../../../components/Button";
import { BiSolidPalette, BiSolidDetail } from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function AddTag({ attid, getTags, setIsAddModalOpen }) {
  const [color, setColor] = useColor("hex", "#121212");
  const [colorpicker, setColorPicker] = useState(false);
  const [description, setDescription] = useState(false);
  const [ardescriptionText, setArDescriptionText] = useState("");
  const [endescriptionText, setEnDescriptionText] = useState("");
  const { translations, language } = useTranslation();
  const [direction, setDirection] = useState(language === "ar" ? "rtl" : "ltr");

  const showColorPicker = () => {
    setColorPicker(!colorpicker);
  };

  const showDescription = () => {
    setDescription(!description);
  };

  let template = {
    title: "",
    fields: [
      {
        title: "English Name",
        name: "en_name",
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
        title: "Arabic Name",
        name: "ar_name",
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
    formData.append("en_name", values.en_name);
    formData.append("ar_name", values.ar_name);

    if (!colorpicker) {
      formData.append("en_description", endescriptionText || null);
      formData.append("ar_description", ardescriptionText || null);
    } else {
      formData.append("en_description", color.hex);
      formData.append("ar_description", color.hex);
    }

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
      <h1 className="font-bold text-2xl bt-3 pb-3">
        {(translations && translations[`Add Tag`]) || "Add Tag"}
      </h1>
      <div className="flex py-3 gap-4">
        <Button
          isLink={false}
          color={"bg-blueColor text-xl text-white px-2"}
          Icon={<BiSolidPalette />}
          onClickFun={showColorPicker}
        />
        <Button
          isLink={false}
          color={"bg-blueColor text-xl text-white px-2"}
          Icon={<BiSolidDetail />}
          onClickFun={showDescription}
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

      {description && (
        <>
          <div>
            <label htmlFor="description">
              {(translations && translations[`Description`]) || "Description"}
            </label>
            <textarea
              className="input-box w-full"
              type="text"
              name="en_description"
              id="description"
              onChange={(e) => setEnDescriptionText(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">
              {(translations && translations[`Description`]) || "Description"}
            </label>
            <textarea
              className="input-box w-full"
              type="text"
              name="ar_description"
              id="description"
              onChange={(e) => setArDescriptionText(e.target.value)}
            />
          </div>
        </>
      )}
      <ReusableForm
        direction={direction}
        translations={translations}
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
