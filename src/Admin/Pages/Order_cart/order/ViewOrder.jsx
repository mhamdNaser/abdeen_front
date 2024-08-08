import React from "react";
import { useTranslation } from "../../../../provider/TranslationProvider";
import usePrintInvoice from "../../../../hooks/usePrintInvoice";
import { useCompanyInfo } from "../../../../provider/CompanyInfoProvider";

export default function ViewOrder({ data, setIsModalOpen }) {
  const { translations, language } = useTranslation();
  const { companyInfo, loading } = useCompanyInfo();
    const { printInvoice } = usePrintInvoice(data, companyInfo);
  console.log(data);

  if (!data)
    return (
      <div className="text-center py-10">
        {(translations && translations["Loading..."]) || "Loading..."}
      </div>
    );

  return (
    <div className="p-8">
      <div className="mx-auto p-5 bg-white shadow-md rounded-lg">
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
              {data.id}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["UserName"]) || "UserName"}
              </span>
              {" : "}
              {data.user_name}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["Status"]) || "Status"}
              </span>
              {" : "}
              {data.status}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["Date"]) || "Date"}
              </span>
              {" : "}
              {data.created_at}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["Payment Method"]) ||
                  "Payment Method"}
              </span>
              {" : "}
              {data.payment !== null ? data.payment.payment_method : null}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["Transaction ID"]) ||
                  "Transaction ID"}
              </span>
              {" : "}
              {data.payment !== null ? data.payment.transaction_id : null}
            </li>
            <li className="mb-2">
              <span className="font-semibold">
                {(translations && translations["Payment ID"]) || "Payment ID"}
              </span>
              {" : "}
              {data.payment !== null ? data.payment.payment_id : null}
            </li>
            <li className="mb-2">
              {data.address.map((addres, index) => (
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
              {" : "}${parseFloat(data.price).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-semibold">
                {(translations && translations["Tax"]) || "Tax"}
              </span>
              {" : "}${parseFloat(data.tax).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-semibold">
                {(translations && translations["Delivery"]) || "Delivery"}
              </span>
              {" : "}${parseFloat(data.delivery).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between border-t">
              <span className="font-semibold">
                {(translations && translations["Total Price"]) || "Total Price"}
              </span>
              {" : "}$
              {parseFloat(data.delivery + data.tax + data.price).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-semibold">
                {(translations && translations["Total Discount"]) ||
                  "Total Discount"}
              </span>
              {" : "}${parseFloat(data.total_discount).toFixed(2)}
            </li>
            <li className="mb-2 flex justify-between border-t py-2">
              <span className="font-semibold">
                {(translations && translations["The net amount"]) ||
                  "The net amount"}
              </span>
              {" : "}${parseFloat(data.total_price).toFixed(2)}
            </li>
          </ul>
        </div>
        <h3 className="text-xl font-semibold mb-3">
          {(translations && translations["Products"]) || "Products"}
        </h3>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="w-full bg-gray-100">
              <th className="py-2 border-b text-start px-1">
                {(translations && translations["image"]) || "image"}
              </th>
              <th className="py-2 border-b text-start px-1">
                {(translations && translations["ID"]) || "ID"}
              </th>
              <th className="py-2 border-b text-start px-1">
                {(translations && translations["Name"]) || "Name"}
              </th>
              <th className="py-2 border-b text-start px-1">
                {(translations && translations["Quantity"]) || "Quantity"}
              </th>
              <th className="py-2 border-b text-start px-1">
                {(translations && translations["Price"]) || "Price"}
              </th>
              <th className="py-2 border-b text-start px-1">
                {(translations && translations["Discount"]) || "Discount"}
              </th>
              <th className="py-2 border-b text-start px-1">
                {" "}
                {(translations && translations["Final Price"]) || "Final Price"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 border-b">
                  <img
                    className="w-12 h-12"
                    src={import.meta.env.VITE_WEBSITE_URL + product.image}
                    alt={product.en_name}
                  />
                </td>
                <td className="py-2 border-b">{product.sku}</td>
                <td className="py-2 border-b">{product.en_name}</td>
                <td className="py-2 border-b">{product.quantity}</td>
                <td className="py-2 border-b">{product.product_price}</td>
                <td className="py-2 border-b">%{product.discount}</td>
                <td className="py-2 border-b">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={printInvoice}
          className="mt-5 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {(translations && translations["Print Invoice"]) || "Print Invoice"}
        </button>
      </div>
    </div>
  );
}
