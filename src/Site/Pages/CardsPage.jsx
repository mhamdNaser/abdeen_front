import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../axios-client";
import ProductCardInCart from "../Components/products/ProductCardInCart";

const TAX_RATE = 0.15;
const DELIVERY_CHARGE = 10;

export default function CardsPage() {
  const { setBackground, getCardProductNum } = useOutletContext();
  const [cardsProducts, setCardsProducts] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [totalCosts, setTotalCosts] = useState({});

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true);
  }, [setBackground]);

  useEffect(() => {
    getInitialItem();
  }, [setCardsProducts]);

  const getInitialItem = () => { 
    const initialProducts =
      JSON.parse(localStorage.getItem("Card_products")) || [];
    setCardsProducts(initialProducts);
  }

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

  const handleTotalCostChange = (productId, totalCost) => {
    setTotalCosts((prevTotalCosts) => ({
      ...prevTotalCosts,
      [productId]: totalCost,
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
        delivery: DELIVERY_CHARGE,
        totalprice: parseInt(finalTotal.toFixed(2)),
      })
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
          localStorage.removeItem("Card_products");
          getInitialItem();
          getCardProductNum();
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

  const totalCost = Object.values(totalCosts).reduce(
    (total, cost) => total + cost,
    0
  );

  const taxAmount = totalCost * TAX_RATE;
  const finalTotal = totalCost + taxAmount + DELIVERY_CHARGE;

  return (
    <div className="flex xl:flex-row flex-col-reverse h-fit min-h-[720px] py-8">
      <div className="xl:w-3/4 w-full flex flex-col px-12">
        <h3 className="xl:text-4xl text-lg font-bold py-8">Items in Your Cart</h3>
        <div className="flex flex-col gap-y-5">
          {cardsProducts.length === 0 ? (
            <div className="px-5 py-4 bg-blocks-color">Add Product To Make Order</div>
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
            Submit Order
          </button>
        </div>
      </div>
      <div className="xl:w-1/4 w-full flex flex-col px-12">
        <h3 className="text-xl font-bold py-8">Order</h3>
        <div className="flex flex-col gap-y-5 bg-blocks-color p-4">
          <p className="flex justify-between w-full">
            Total Cost:
            <span>{totalCost.toFixed(2)}</span>
          </p>
          <p className="flex justify-between w-full">
            Tax (15%):
            <span>{taxAmount.toFixed(2)}</span>
          </p>
          <p className="flex justify-between w-full">
            Delivery Charge:
            <span>{DELIVERY_CHARGE.toFixed(2)}</span>
          </p>
          <p className="flex border-t py-2 justify-between w-full font-bold">
            Final Total:
            <span>{finalTotal.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
