import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { BiBlock, BiSolidAlarmAdd, BiSolidShow } from "react-icons/bi";
import { IoIosDoneAll } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckReturn } from "react-icons/tb";
import { useTranslation } from "../../../provider/TranslationProvider";
import ViewOrder from "./order/ViewOrder";
import ModalContainer from "../../../components/ModalContainer";
import { toast } from "react-toastify";

export default function AllOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [loading, setLoading] = useState(true);
  const { translations, language } = useTranslation();
  const [order, setOrder] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [direction, setDirection] = useState();

  const getOrder = async () => {
    try {
      const res = await axiosClient.get("admin/all-orders");
      setOrder(res.data.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    setDirection(language === "ar" ? "rtl" : "ltr");
    getOrder();
  }, [language]);


  const showOrder = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };


  const changestatus = async (orderid, value) => {
    const order = { status: value };
    console.log(order, orderid);
    const id = toast.loading("Updating status...");

    axiosClient
      .post(`/admin/changstatus-orders/${orderid}`, order)
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


  const columns = [
    {
      name: `${(translations && translations["UserName"]) || "UserName"}`,
      selector: (row) => row.user_name,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Payment ID"]) || "Payment ID"}`,
      selector: (row) =>
        row?.payment !== null ? row.payment.payment_id : null,
      minWidth: "15%",
    },
    {
      name: `${
        (translations && translations["Payment Method"]) || "Payment Method"
      }`,
      selector: (row) =>
        row?.payment !== null ? row.payment.payment_method : null,
      minWidth: "15%",
    },
    {
      name: `${
        (translations && translations["Transaction ID"]) || "Transaction ID"
      }`,
      selector: (row) =>
        row?.payment !== null ? row.payment.transaction_id : null,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Price"]) || "Price"}`,
      selector: (row) => row.price,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Tax"]) || "Tax"}`,
      selector: (row) => row.tax,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Delivery"]) || "Delivery"}`,
      selector: (row) => row.delivery,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Total Price"]) || "Total Price"}`,
      selector: (row) => row.total_price,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Date"]) || "Date"}`,
      selector: (row) => row.created_at,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Status"]) || "Status"}`,
      selector: (row) => (
        <div>
          <span
            className={`${
              row.status === "pending"
                ? "bg-blueColor"
                : row.status === "on_delivery"
                ? "bg-orangeColor"
                : row.status === "reject"
                ? "bg-red-600"
                : row.status === "return"
                ? "bg-redColor"
                : "bg-greenColor"
            } text-white py-1 px-2 rounded-lg text-xs`}
          >
            {row.status}
          </span>
        </div>
      ),
      maxWidth: "15%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
          {row.status === "pending" ? (
            <>
              <Button
                isLink={false}
                color={"bg-orangeColor"}
                title={<CiDeliveryTruck />}
                onClickFun={() => changestatus(row.id, "on_delivery")}
              />
              <Button
                isLink={false}
                color={"bg-redColor"}
                title={<BiBlock />}
                onClickFun={() => changestatus(row.id, "reject")}
              />
            </>
          ) : row.status === "on_delivery" ? (
            <>
              <Button
                isLink={false}
                color={"bg-greenColor"}
                title={<IoIosDoneAll />}
                onClickFun={() => changestatus(row.id, "complete")}
              />
              <Button
                isLink={false}
                color={"bg-orangeColor"}
                title={<TbTruckReturn />}
                onClickFun={() => changestatus(row.id, "return")}
              />
            </>
          ) : null}
          <Button
            isLink={false}
            color={"bg-blueColor"}
            title={<BiSolidShow />}
            onClickFun={() => showOrder(row)}
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: "orders Table",
      url: "/admin/allbrands",
      active: true,
    },
  ];

  return (
    <>
      <Page>
        <PageTitle
          links={links}
          right={
            // hasAddPermission && (
            <>
              <div>
                <Button
                  isLink={false}
                  color={"bg-greenColor text-xl text-white px-2"}
                  Icon={<BiSolidAlarmAdd />}
                  onClickFun={() => setIsAddModalOpen((prev) => !prev)}
                />
              </div>
              <div>
                {/* <Button
                  isLink={false}
                  color={"bg-redColor text-xl text-white px-2"}
                  Icon={<BiSolidFileExport />}
                  onClickFun={archiveSelectedItems}
                /> */}
              </div>
            </>
            // )
          }
        />
        {isModalOpen && (
          <ModalContainer
            direction={direction}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            width={"w-3/4"}
            component={
              <ViewOrder data={clickedRow} setIsModalOpen={setIsModalOpen} />
            }
          />
        )}

        {/* {isAddModalOpen && (
          <ModalContainer
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
            component={
              <AddBrand
                countries={countries}
                getBrands={getBrands}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )} */}
        <div className="my-4">
          <Table
            Title={"orders Table"}
            direction={direction}
            translations={translations}
            columns={columns}
            data={order}
            hasEditPermission={true} // Assuming you have a way to determine this
            editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
            handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
            setSelectedItemsProp={setSelectedItems}
          />
        </div>
      </Page>
    </>
  );
}
