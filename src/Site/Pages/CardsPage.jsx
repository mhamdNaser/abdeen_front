import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../axios-client";
import ProductCardInCart from "../Components/products/ProductCardInCart";
import { useTranslation } from "../../provider/TranslationProvider";
import { BiSolidEditAlt } from "react-icons/bi";
import ModalContainer from "../../components/ModalContainer";
import Login from "./Auth/Login";
import OrderAddressForm from "../Components/OrderAddressForm";

// const TAX_RATE = 0.15;
// const DELIVERY_CHARGE = 10;

export default function CardsPage({ title }) {
  const { setBackground, getCardProductNum } = useOutletContext();
  const { translations } = useTranslation();
  const [cardsProducts, setCardsProducts] = useState([]);
  const [deliveries, setDelivery] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [totalCosts, setTotalCosts] = useState({});
  const [totalDiscounts, setTotalDiscounts] = useState({});
  const [tax, setTax] = useState();
  const [deliveryform, setDeliveryForm] = useState(false);
  const [paymentform, setPaymentForm] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedpayment, setSelectedPayment] = useState()
  const navigated = useNavigate();
  const [address, setAddress] = useState({
    country_id: "",
    state_id: "",
    city_id: "",
    address_1: "",
    address_2: "",
    address_3: "",
  });

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true);
  }, [setBackground]);

  useEffect(() => {
    getInitialItem();
    getDelivery();
    getTax();
    getPaymentMethod();
  }, [setCardsProducts]);

  const getDelivery = () => {
    axiosClient.get("site/all-deliveries").then((res) => {
      setDelivery(res.data.data);
    });
  };

  const getPaymentMethod = () => {
    axiosClient.get("site/paymentMethod").then((res) => {
      setPaymentMethods(res.data);
    });
  };

  const getTax = () => {
    axiosClient.get("site/tax").then((res) => {
      setTax(res.data.data[0].tax);
    });
  };

  const getInitialItem = () => {
    const initialProducts =
      JSON.parse(localStorage.getItem("Card_products")) || [];
    setCardsProducts(initialProducts);
  };

  const updateLocalStorage = (products) => {
    localStorage.setItem("Card_products", JSON.stringify(products));
  };

  const handleIncrease = (index) => {
    const updatedProducts = [...cardsProducts];
    updatedProducts[index].quantity =
      (updatedProducts[index].quantity || 0) + 1;
    setCardsProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
    getCardProductNum();
  };

  const handleDecrease = (index) => {
    const updatedProducts = [...cardsProducts];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
    } else {
      updatedProducts.splice(index, 1);
    }
    setCardsProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
    getCardProductNum();
  };

  const handleTagSelect = (index, productId, tagId, attribute) => {
    setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [productId]: {
        ...prevSelectedTags[productId],
        [attribute]: tagId,
      },
    }));
  };

  const showDeiveryform = () => {
    setDeliveryForm(true);
  };

  const showPaymentform = () => {
    setPaymentForm(!paymentform);
  };

  const handleTotalCostChange = (productId, totalCost, totalDiscount) => {
    setTotalCosts((prevTotalCosts) => ({
      ...prevTotalCosts,
      [productId]: totalCost,
    }));
    setTotalDiscounts((prevTotalDiscount) => ({
      ...prevTotalDiscount,
      [productId]: totalDiscount,
    }));
  };

  const submitOrder = () => {
    const id = toast.loading("Error , Log In Please...");

    const orderData = cardsProducts.map((product) => ({
      ...product,
      selectedTags: selectedTags[product.id],
    }));

    axiosClient
      .post("site/store-order", {
        products: orderData,
        price: totalCost,
        tax: taxAmount,
        // paymentmethod: selectedpayment,
        delivery: deliveryCharge,
        totalprice: parseFloat(finalTotal.toFixed(2)),
        totaldiscount: parseFloat(totalDiscount.toFixed(2)),
        address: address, // Include the address in the request
      })
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
          getInitialItem();
          getCardProductNum();
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
        navigated(`/vieworder/${res.data.orderId}/${"checkout"}`);
      })
      .catch((err) => {
        setLoginModalOpen(true);
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

  const totalCost = Object.values(totalCosts).reduce(
    (total, cost) => total + cost,
    0
  );

  const totalDiscount = Object.values(totalDiscounts).reduce(
    (total, cost) => total + cost,
    0
  );

  const taxAmount = totalCost * (tax / 100);
  const finalTotal =
    totalCost - totalDiscount + taxAmount + parseFloat(deliveryCharge);

  return (
    <div className="flex xl:flex-row flex-col-reverse h-fit min-h-[720px] py-8">
      <div className="xl:w-3/4 w-full flex flex-col px-12">
        <h3 className="xl:text-4xl text-lg font-bold py-8">
          {!title
            ? (translations && translations["Items in Your Cart"]) ||
              "Items in Your Cart"
            : (translations && translations[title]) || title}
        </h3>
        <div className="flex flex-col gap-y-5">
          {cardsProducts.length === 0 ? (
            <div className="px-5 py-4 bg-blocks-color">
              {(translations && translations["Add Product To Make Order"]) ||
                "Add Product To Make Order"}
            </div>
          ) : (
            cardsProducts.map((product, index) => (
              <ProductCardInCart
                key={index}
                index={index}
                product={product}
                onIncrease={() => handleIncrease(index)}
                onDecrease={() => handleDecrease(index)}
                onTagSelect={handleTagSelect}
                selectedTags={selectedTags[product.id]}
                onTotalCostChange={handleTotalCostChange}
              />
            ))
          )}
          <button
            onClick={submitOrder}
            className="bg-blue-500 text-white w-1/6 min-w-fit px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {(translations && translations["Submit Order"]) || "Submit Order"}
          </button>
        </div>
      </div>
      <div className="xl:w-1/4 w-full flex flex-col px-12">
        <div className="flex flex-col gap-y-5 bg-blocks-color p-4 mt-4">
          <h3 className="text-xl font-bold ">
            {(translations && translations["Order"]) || "Order"}
          </h3>
          <div className="flex flex-col gap-y-5 p-4">
            <p className="flex justify-between w-full">
              {(translations && translations["Total Price"]) || "Total Price"}
              {" : "}
              <span>{totalCost.toFixed(2)}</span>
            </p>
            <p className="flex justify-between w-full ">
              {(translations && translations["Discount"]) || "Discount"}
              {" : "}
              <span>{Number(totalDiscount).toFixed(2)}</span>
            </p>
            <p className="flex justify-between w-full border-t border-b py-3">
              {(translations && translations["The net amount"]) ||
                "The net amount"}
              {" : "}
              <span>{Number(totalCost - totalDiscount).toFixed(2)}</span>
            </p>
            <p className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2  w-fit">
                {(translations && translations["Delivery"]) || "Delivery"}
                <button onClick={showDeiveryform}>
                  <BiSolidEditAlt />
                </button>
                {" : "}
              </div>
              <span>{Number(deliveryCharge).toFixed(2)}</span>
            </p>
            <p className="flex justify-between w-full">
              {(translations && translations["Tax"]) || "Tax"} (15%){" : "}
              <span>{Number(taxAmount).toFixed(2)}</span>
            </p>
            {deliveryform && (
              <div className="flex w-full">
                <select
                  type="text"
                  className="input-box w-full"
                  onChange={(e) => setDeliveryCharge(e.target.value)}
                >
                  <option value={0}>
                    {(translations && translations["Without Delivery"]) ||
                      "Without Delivery"}
                  </option>
                  {deliveries.map((delivery, index) => (
                    <option key={index} value={delivery.cost}>
                      {delivery.country}
                      {delivery.state && " / "}
                      {delivery?.state}
                      {delivery.city && " / "}
                      {delivery?.city}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <p className="flex border-t py-2 justify-between w-full font-bold">
              {(translations && translations["Final Total Price"]) ||
                "Final Total Price"}
              {" : "}
              <span>{finalTotal.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-y-5 bg-blocks-color p-4 mt-4">
            <OrderAddressForm setAddress={setAddress} />
          </div>
        </div>
      </div>
      {loginModalOpen && (
        <ModalContainer
          isModalOpen={loginModalOpen}
          setIsModalOpen={setLoginModalOpen}
          component={<Login setIsAddModalOpen={setLoginModalOpen} />}
        />
      )}
    </div>
  );
}
