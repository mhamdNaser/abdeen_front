import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useTranslation } from "../../../provider/TranslationProvider";
import axiosClient from "../../../axios-client";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";

export default function AllPayment() {
  const { translations } = useTranslation();
  const [payments, setPayments] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const getPayments = () => {
    axiosClient
      .get("/admin/all-payments")
      .then((res) => {
        setPayments(res.data);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
      });
  };

  useEffect(() => {
    getPayments();
  }, []);

  const columns = [
    {
      name: `${(translations && translations["Payment ID"]) || "Payment ID"}`,
      selector: (row) => row.payment_id,
      maxWidth: "fit-content",
    },
    {
      name: `${
        (translations && translations["Payment Method"]) || "Payment Method"
      }`,
      selector: (row) => row.payment_method,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Amount"]) || "Amount"}`,
      selector: (row) => row.amount,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Currency"]) || "Currency"}`,
      selector: (row) => row.currency,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Status"]) || "Status"}`,
      selector: (row) => row.status,
      maxWidth: "fit-content",
    },
    {
      name: `${
        (translations && translations["Transaction ID"]) || "Transaction ID"
      }`,
      selector: (row) => row.transaction_id,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Payer Name"]) || "Payer Name"}`,
      selector: (row) => row.payer_name,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Email"]) || "Email"}`,
      selector: (row) => row.payer_email,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Order ID"]) || "Order ID"}`,
      selector: (row) => (row.order ? row.order.id : ""),
      maxWidth: "fit-content",
    },
  ];

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: "Payments Table",
      url: "/admin/allpayment",
      active: true,
    },
  ];

  return (
    <>
      <Page>
        <PageTitle links={links} />
        <div className="my-4">
          <Table
            Title={
              (translations && translations["Payments Table"]) ||
              "Payments Table"
            }
            columns={columns}
            data={payments}
            hasEditPermission={true}
            editBtnFun={(row) => console.log("Edit", row)}
            handleDelete={(id) => console.log("Delete", id)}
            setSelectedItemsProp={setSelectedItems}
          />
        </div>
      </Page>
    </>
  );
}
