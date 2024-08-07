import { toast } from "react-toastify";
import ReusableForm from "../../../../components/ReusableForm";
import axiosClient from "../../../../axios-client";

export const AddPaymentMethod = ({ getPaymentMethods, setIsAddModalOpen }) => {
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const id = toast.loading("submitting, please wait...");

      const paymentMethodData = {
        name: values.name[0].name,
        client_id: values.ClientId,
        client_secret: values.ClientSecret,
        payment_action: values.paymentAction,
        currency: values.currency[0].name,
        locale: values.locale[0].name,
      };

      const { data } = await axiosClient.post(
        "admin/paymentMethod/create-payment",
        paymentMethodData
      );
      console.log(data);
      if (data.success) {
        toast.update(id, {
          type: "success",
          render: data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
        getPaymentMethods();
        setIsAddModalOpen((prev) => !prev);
      } else {
        toast.update(id, {
          type: "error",
          render: data.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
        setIsAddModalOpen((prev) => !prev);
      }
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast.error("Failed to add payment method");
    }
  };

  const validate = (watchValues) => {
    // console.log(watchValues);
  };

  const formTemplate = {
    title: "Add New Payment Method",
    fields: [
      {
        title: "Name",
        name: "name",
        type: "select",
        options: [{ name: "Paypal" }, { name: "Strip" }],
        optionValue: "name",
        optionText: "name",
        styles: "md:w-[45%]",
      },
      {
        title: "Client ID",
        name: "ClientId",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "Client Secret",
        name: "ClientSecret",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "Currency",
        name: "currency",
        type: "select",
        options: [{ name: "USD" }],
        optionValue: "name",
        optionText: "name",
        styles: "md:w-[45%]",
      },
      {
        title: "Locale",
        name: "locale",
        type: "select",
        options: [{ name: "en_US" }],
        optionValue: "name",
        optionText: "name",
        styles: "md:w-[45%]",
      },
    ],
  };

  return (
    <ReusableForm
      template={formTemplate}
      onSubmit={handleSubmit}
      validate={validate}
      btnWidth="w-full text-white"
      btnText="Add"
      addedStyles="md:w-[800px]"
    />
  );
};
