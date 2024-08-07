import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axiosClient from "../../axios-client";
import { useNavigate, useOutletContext } from "react-router-dom";

const PayPalCheckoutButton = ({ orderId }) => {
  const { getCardProductNum } = useOutletContext();
  const navigated = useNavigate();
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    getClientId();
  }, []);

  const getClientId = async () => {
    try {
      const res = await axiosClient.get("site/getClientIdPaypal");
      setClientId(res.data.paypalClientId);
    } catch (error) {
      console.error("Error fetching PayPal client ID", error);
    }
  };

  const createOrder = async (data, actions) => {
    try {
      const response = await axiosClient.post("site/create-payment", {
        orderId,
      });
      return response.data.id;
    } catch (error) {
      console.error("Error creating order", error);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await axiosClient.post("site/capture-payment", {
        orderID: data.orderID,
      });
      console.log("Payment captured successfully:", response.data);
      localStorage.removeItem("Card_products");
      getCardProductNum();
      navigated("/allProduct");
    } catch (error) {
      console.error("Error capturing payment", error);
    }
  };

  const onError = (error) => {
    console.error("PayPal Button Error", error);
  };

  const onScriptLoadError = (error) => {
    console.error("Failed to load the PayPal JS SDK script", error);
  };

  return (
    <>
      {clientId !== "" && (
        <PayPalScriptProvider
          options={{ "client-id": clientId }}
          onError={onScriptLoadError}
        >
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default PayPalCheckoutButton;
