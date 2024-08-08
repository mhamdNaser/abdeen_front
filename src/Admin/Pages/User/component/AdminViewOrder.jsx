import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePrintInvoice from "../../../../hooks/usePrintInvoice";
import { useTranslation } from "../../../../provider/TranslationProvider";
import axiosClient from "../../../../axios-client";
import { Page } from "../../../../components/StyledComponents";
import PageTitle from "../../../../components/PageTitle";

export default function AdminViewOrder() {
  const { id, orderid, username } = useParams();
  const [order, setOrder] = useState(null);
  const { printInvoice } = usePrintInvoice(order);
  const { translations, language } = useTranslation();
  const navigated = useNavigate();

  const getShowOrder = () => {
    axiosClient.get(`site/show-order/${orderid}`).then((res) => {
      setOrder(res.data.data);
    });
  };

  useEffect(() => {
    getShowOrder();
  }, []);

  if (!order)
    return (
      <div className="text-center py-10">
        {(translations && translations["Loading..."]) || "Loading..."}
      </div>
    );

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: `${
        (translations && translations["Users Table"]) || "Users Table"
      }`,
      url: "/admin/allusers",
      active: false,
    },
    {
      title: `${username}`,
      url: `/admin/userProfile/${id}/${username}`,
      active: false,
    },
    {
      title: `${
        (translations && translations["Order ID"]) || "Order ID"
      }  :  ${orderid}`,
      url: ``,
      active: true,
    },
  ];
  return (
    <Page>
      <PageTitle links={links} />
      <div className="my-4">
        <div className="flex gap-x-4 bg-background-color p-8">
          <div className="w-3/4 mx-auto p-5 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-5">
              {(translations && translations["Order Details"]) ||
                "Order Details"}
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
                  <span className="font-semibold">
                    {(translations && translations["Transaction ID"]) ||
                      "Transaction ID"}
                  </span>
                  {" : "}
                  {order.payment !== null ? order.payment.transaction_id : null}
                </li>
                <li className="mb-2">
                  <span className="font-semibold">
                    {(translations && translations["Payment ID"]) ||
                      "Payment ID"}
                  </span>
                  {" : "}
                  {order.payment !== null ? order.payment.payment_id : null}
                </li>
                <li className="mb-2">
                  {order.address &&
                    order.address.map((addres, index) => (
                      <div key={index} className="hover:bg-gray-50">
                        <div className="">
                          <span className="font-semibold">
                            {(translations && translations["Address"]) ||
                              "Address"}
                          </span>
                          {" : "}
                          {addres.country}
                          {" / "}
                          {addres.state}
                          {" / "}
                          {addres.city}
                          {" / "}
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
                    {(translations && translations["Total Price"]) ||
                      "Total Price"}
                  </span>
                  {" : "}$
                  {parseFloat(order.delivery + order.tax + order.price).toFixed(
                    2
                  )}
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
                    {(translations && translations["Final Price"]) ||
                      "Final Price"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{product.sku}</td>
                    <td className="py-2 px-4 border-b">{product.en_name}</td>
                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                    <td className="py-2 px-4 border-b">
                      {product.product_price}
                    </td>
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
      </div>
    </Page>
  );
}