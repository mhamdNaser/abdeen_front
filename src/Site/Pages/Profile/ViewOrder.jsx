import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import usePrintInvoice from "../../../hooks/usePrintInvoice";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function ViewOrder() {
  const { id } = useParams();
  const { setBackground } = useOutletContext();
  const [order, setOrder] = useState(null);
  const { printInvoice } = usePrintInvoice(order);
  const { translations, language } = useTranslation();

  const getShowOrder = () => {
    axiosClient.get(`site/show-order/${id}`).then((res) => {
      setOrder(res.data.data);
    });
  };

  useEffect(() => {
    getShowOrder();
    setBackground(false);
    return () => setBackground(true);
  }, [setBackground]);

  if (!order)
    return (
      <div className="text-center py-10">
        {(translations && translations["Loading..."]) || "Loading..."}
      </div>
    );

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-5">
          {(translations && translations["Order Details"]) || "Order Details"}
        </h2>
        <div className="flex flex-col xl:flex-row w-full border p-3 mb-5">
          <ul className="xl:w-1/2">
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["Order ID"]) || "Order ID"}
              </span>
              {" : "}
              {order.id}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["UserName"]) || "UserName"}
              </span>
              {" : "}
              {order.user_name}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["Status"]) || "Status"}
              </span>
              {" : "}
              {order.status}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["Date"]) || "Date"}
              </span>
              {" : "}
              {order.created_at}
            </li>
            <li className="mb-2">
              {order.address.map((addres, index) => (
                <div key={index} className="hover:bg-gray-50">
                  <div className="">
                    <span className="font-semibold">
                      {(translations && translations["Address"]) || "Address"}
                    </span>
                    {" : "}
                    {addres.country}
                    {" / "}
                    {addres.state}
                    {" / "}
                    {addres.city}
                  </div>
                  <div>
                    {addres.address_1}
                    {" / "}
                    {addres.address_2}
                    {" / "}
                    {addres.address_3}
                  </div>
                </div>
              ))}
            </li>
          </ul>
          <ul className="xl:w-1/2">
            <li className="mb-2 flex justify-between">
              <span className="font-semibold">
                {(translations && translations["Price"]) || "Price"}
              </span>
              {" : "}${parseFloat(order.price).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-semibold">
                {(translations && translations["Tax"]) || "Tax"}
              </span>
              {" : "}${parseFloat(order.tax).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-semibold">
                {(translations && translations["Delivery"]) || "Delivery"}
              </span>
              {" : "}${parseFloat(order.delivery).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between border-t">
              <span className="font-semibold">
                {(translations && translations["Total Price"]) || "Total Price"}
              </span>
              {" : "}$
              {parseFloat(order.delivery + order.tax + order.price).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-semibold">
                {(translations && translations["Total Discount"]) ||
                  "Total Discount"}
              </span>
              {" : "}${parseFloat(order.total_discount).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between border-t py-2">
              <span className="font-semibold">
                {(translations && translations["The net amount"]) ||
                  "The net amount"}
              </span>
              {" : "}${parseFloat(order.total_price).toFixed(2)}
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mb-3">Products</h3>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="w-full bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">
                {(translations && translations["ID"]) || "ID"}
              </th>
              <th className="py-2 px-4 border-b">
                {(translations && translations["Name"]) || "Name"}
              </th>
              <th className="py-2 px-4 border-b">
                {(translations && translations["Quantity"]) || "Quantity"}
              </th>
              <th className="py-2 px-4 border-b">
                {(translations && translations["Price"]) || "Price"}
              </th>
              <th className="py-2 px-4 border-b">
                {(translations && translations["Discount"]) || "Discount"}
              </th>
              <th className="py-2 px-4 border-b">
                {" "}
                {(translations && translations["Final Price"]) || "Final Price"}
              </th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{product.sku}</td>
                <td className="py-2 px-4 border-b">{product.en_name}</td>
                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b">{product.product_price}</td>
                <td className="py-2 px-4 border-b">%{product.discount}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={printInvoice}
          className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
}
