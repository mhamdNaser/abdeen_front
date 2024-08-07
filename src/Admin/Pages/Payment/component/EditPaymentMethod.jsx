import React from "react";
import { toast } from "react-toastify";
import ReusableForm from "../../../../components/ReusableForm";
import axiosClient from "../../../../axios-client";

export const EditPaymentMethod = ({
  data,
  getPaymentMethod,
  setIsAddModalOpen,
}) => {
  const handleSubmit = async (values) => {
      const id = toast.loading("submitting, please wait...");

      const paymentMethodData = {
        client_id: values.ClientId,
        client_secret: values.ClientSecret,
        currency: values.currency,
        locale: values.locale,
      };

      axiosClient.post(
        `/admin/paymentMethod/update/${data?.id}`,
        paymentMethodData
      ).then((data) => {
        if (data.success === false) {
          toast.update(id, {
            type: "error",
            render: data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          toast.update(id, {
            type: "success",
            render: data.message,
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
      })
  };

  const validate = (watchValues) => {
    console.log(watchValues);
  };

  const formTemplate = {
    title: "",
    fields: [
      {
        title: "Client ID",
        name: "ClientId",
        type: "text",
        value: data?.client_id,
        styles: "md:w-[45%]",
      },
      {
        title: "Client Secret",
        name: "ClientSecret",
        type: "text",
        value: data?.client_secret,
        styles: "md:w-[45%]",
      },
      {
        title: "Currency",
        name: "currency",
        type: "text",
        value: data?.currency,
        styles: "md:w-[45%]",
      },
      {
        title: "Locale",
        name: "locale",
        type: "text",
        value: data?.locale,
        styles: "md:w-[45%]",
      },
    ],
  };

  return (
    <ReusableForm
      template={formTemplate}
      onSubmit={handleSubmit}
      validate={validate}
      btnWidth="w-fit text-white"
      btnText="Update"
      addedStyles="md:w-[800px]"
    />
  );
};
