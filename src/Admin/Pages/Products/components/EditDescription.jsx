import { toast } from "react-toastify";
import ReusableForm from "../../../../components/ReusableForm";
import axiosClient from "../../../../axios-client";

export default function EditDescription({
  data,
  getProduct,
  setIsModalOpen,
}) {

  let template = {
    title: "Edit Information Product",
    fields: [
      {
        title: "English description",
        name: "en_description",
        type: "textArea",
        value: data?.en_description,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "Arabic description",
        name: "ar_description",
        type: "textArea",
        value: data?.ar_description,
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
    formData.append("en_description", values.en_description);
    formData.append("ar_description", values.ar_description);

    console.log(formData);
    axiosClient
      .post(`/admin/update-product/${data?.id}`, formData)
      .then((res) => {
        if (res.success === false) {
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
          getProduct();
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
    <ReusableForm
      template={template}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-full"}
      btnText={"add"}
      addedStyles={"md:w-[400px] lg:w-[800px]"}
    />
  );
}
