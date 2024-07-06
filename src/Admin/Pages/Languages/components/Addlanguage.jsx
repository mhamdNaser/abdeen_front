import { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import axiosClient from "../../../../axios-client";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
// import { useMutationHook } from "../../../../hooks/useMutationHook";
import ReusableForm from "../../../../components/ReusableForm";
const postData = async (formData) => {
  const res = await axiosClient.post("/admin/language/store", formData);
  if (res.data.success === true) {
    axiosClient.post("/admin/translation/store", {
      slug: formData.slug,
    });
  }
  return res;
};
export default function Addlanguage(props) {
  const { getAllLanguages, langs } = props;

  // const mutation = useMutationHook(postData, ["languages"]);

  const handleSubmit = async (values) => {
    let language;
    langs.map((ele) => {
      if (ele.code === values.language[0].code) {
        language = ele.lanName;
      }
    });

    const formData = {
      default: 0,
      direction: values.direction[0].name,
      name: language,
      slug: values.slug,
      status: values.status[0].name,
    };

    const id = toast.loading("submitting, please wait...");
    try {
      const res = await mutation.mutateAsync(formData);
      toast.update(id, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(id, {
        type: "error",
        render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  let template = {
    title: "add new language",
    fields: [
      {
        title: "language",
        name: "language",
        type: "select",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        options: [...langs],
        optionValue: "code",
        styles: "md:w-[45%]",
        optionText: "lanName",
      },
      {
        title: "Direction",
        name: "direction",
        type: "select",
        styles: "md:w-[45%]",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        options: [{ name: "LTR" }, { name: "RTL" }],
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "status",
        name: "status",
        styles: "md:w-[45%]",
        type: "select",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        options: [{ name: "publish" }, { name: "draft" }],
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "slug",
        styles: "md:w-[45%]",
        name: "slug",
        type: "text",
        readOnly: true,
      },
    ],
  };

  const validate = (watchedValues, methods) => {
    const { errors, setError, clearErrors, setValue, resetField } = methods;
    console.log(watchedValues);
    if (watchedValues?.language !== "" && watchedValues?.language) {
      setValue("slug", watchedValues?.language[0].code);
    } else {
      // resetField("slug");
    }
  };

  return (
    <ReusableForm
      template={template}
      btnText={"add new language"}
      btnWidth={"w-[200px] "}
      watchFields={["language"]}
      validate={validate}
      onSubmit={handleSubmit}
    />
  );
}
