import { toast } from "react-toastify";
import ReusableForm from "../../../../components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async ({ formLanguage, id }) => {
  const res = axiosClient.post(`/admin/language/update/${id}`, formLanguage);
  return res;
};
const EditLanguage = ({ langData, languages, setIsModalOpen }) => {
  let template = {
    title: "Edit language",
    fields: [
      {
        title: "Direction",
        name: "directionEdit",
        type: "select",
        value: langData?.direction,
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        options: [{ name: "LTR" }, { name: "RTL" }],
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "status",
        name: "statusEdit",
        type: "select",
        value: langData?.status,
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        options: [{ name: "publish" }, { name: "draft" }],
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "slug",
        value: langData?.slug,
        name: "slugEdit",
        type: "text",
        readOnly: true,
      },
    ],
  };

  const validate = (watchedValues, methods) => {
    const { errors, setError, clearErrors, setValue, resetField } = methods;
    console.log(watchedValues);
    if (watchedValues?.languageEdit !== "" && watchedValues?.languageEdit) {
      setValue("slugEdit", watchedValues?.languageEdit[0].code);
    } else {
      resetField("slugEdit");
    }
  };
  const mutation = useMutationHook(postData, ["languages"]);

  const handleSubmit = async (values) => {
    let language;
    languages?.map((ele) => {
      if (ele.code === values.languageEdit) {
        language = ele.lanName;
      }
    });

    const formLanguage = {
      default: langData?.default,
      direction: values?.directionEdit[0].name,
      slug: values?.slugEdit,
      status: values?.statusEdit[0].name,
    };
    const toastId = toast.loading("submitting, please wait...");
    try {
      const res = await mutation.mutateAsync({
        formLanguage,
        id: langData?.id,
      });
      setIsModalOpen(false);
      toast.update(toastId, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(toastId, {
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

  return (
    <ReusableForm
      template={template}
      btnText={"edit"}
      btnWidth={"w-full"}
      watchFields={["languageEdit"]}
      validate={validate}
      onSubmit={handleSubmit}
    />
  );
};

export default EditLanguage;
