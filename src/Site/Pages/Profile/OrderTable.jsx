import React, { useEffect, useState } from "react";
import { useTranslation } from "../../../provider/TranslationProvider";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { BiSolidShow, BiSolidTrashAlt } from "react-icons/bi";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";

export default function OrderTable({ userId }) {
  const { translations, language } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")));

  const getOrder = () => {
    axiosClient.get(`site/show-oreders/${user?.id}`).then((res) => {
      setOrder(res.data.data);
    });
  };

  const deleteOrder = (value) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`site/delete-oreder/${value}`)
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
          getOrder();
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

  useEffect(() => {
    getOrder();
  }, [userId]);

  const columns = [
    {
      name: `${(translations && translations["Price"]) || "Price"}`,
      selector: (row) => row.price,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Tax"]) || "Tax"}`,
      selector: (row) => parseFloat(row.tax).toFixed(2),
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Delivery"]) || "Delivery"}`,
      selector: (row) => row.delivery,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Total Price"]) || "Total Price"}`,
      selector: (row) =>
        parseFloat(row.price + row.delivery + row.tax).toFixed(2),
      maxWidth: "fit-content",
    },
    {
      name: `${
        (translations && translations["Total Discount"]) || "Total Discount"
      }`,
      selector: (row) => row.total_discount,
      maxWidth: "fit-content",
    },
    {
      name: `${
        (translations && translations["The net amount"]) || "The net amount"
      }`,
      selector: (row) => row.total_price,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Date"]) || "Date"}`,
      selector: (row) => row.date,
      maxWidth: "fit-content",
    },
    {
      name: `${(translations && translations["Status"]) || "Status"}`,
      maxWidth: "fit-content",
      selector: (row) => (
        <div>
          <span
            className={`${
              row.status === "pending"
                ? "bg-blueColor"
                : row.status === "on_delivery"
                ? "bg-orangeColor"
                : row.status === "reject"
                ? "bg-redColor"
                : "bg-greenColor"
            } text-white py-1 px-2 rounded-lg text-xs`}
          >
            {row.status}
          </span>
        </div>
      ),
    },
    {
      name: `${(translations && translations["Actions"]) || "Actions"}`,
      cell: (row) => (
        <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
          <Button
            isLink={true}
            color={"bg-blueColor"}
            Icon={<BiSolidShow />}
            goto={`/vieworder/${row.id}`}
          />
          {row.status === "pending" ? (
            <Button
              isLink={false}
              color={"bg-redColor"}
              Icon={<BiSolidTrashAlt />}
              onClickFun={() => deleteOrder(row.id)}
            />
          ) : null}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        Title={(translations && translations["orders Table"]) || "orders Table"}
        // direction={direction}
        columns={columns}
        data={order}
        print={false}
        hasEditPermission={true} // Assuming you have a way to determine this
        editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
        handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
        setSelectedItemsProp={setSelectedItems}
      />
    </div>
  );
}
