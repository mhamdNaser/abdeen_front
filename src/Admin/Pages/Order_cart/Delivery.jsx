import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import { useTranslation } from "../../../provider/TranslationProvider";
import { IoAddCircleSharp } from "react-icons/io5";
import ModalContainer from "../../../components/ModalContainer";
import { AddDelivery } from "./delivery/AddDelivery";
import { useLocation } from "../../../provider/LocationProvider";
import Table from "../../../components/Table";
import axiosClient from "../../../axios-client";
import {
  BiSolidEditAlt,
  BiSolidTrashAlt,
} from "react-icons/bi";
import EditDelivery from "./delivery/EditDelivery";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Delivery() {
  const { translations, language } = useTranslation();
  const { countries, states, cities } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [clickedRow, setClickedRow] = useState();


  const getDelivery = () => { 
    axiosClient.get("admin/all-deliveries").then((res) => { 
      console.log(res.data.data);
      setDelivery(res.data.data);
    });
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: translations.sure_delete || "Are you sure?",
      text: translations.alert_delete || "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      theme: "dark",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: translations.not_yes || "cancel",
      confirmButtonText: translations.yes_delete || "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFunc(id);
        getDelivery();
      }
    });
  };

  const deleteFunc = async (value) => {
     const id = toast.loading("Error , Check your input again...");
    const res = await axiosClient
      .get(`/admin/delete-delivery/${value}`)
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
          getDelivery();
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

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  useEffect(() => { 
    getDelivery();
  },[])

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: `${(translations && translations["Delivery"]) || "Delivery"}`,
      url: "/admin/delivery",
      active: true,
    },
  ];

  const columns = [
    {
      name: "Cost",
      selector: (row) =>  parseFloat(row.cost).toFixed(2),
      maxWidth: "15%",
    },
    {
      name: "Country",
      selector: (row) => row.country || "null",
      maxWidth: "15%",
    },
    {
      name: "State",
      selector: (row) => row.state || "null",
      maxWidth: "15%",
    },
    {
      name: "City",
      selector: (row) => row.city || "null",
      maxWidth: "15%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
          {/* {hasEditPermission && ( */}
          <Button
            isLink={false}
            color={"bg-orangeColor"}
            Icon={<BiSolidEditAlt />}
            onClickFun={() => editBtnFun(row)}
          />
          {/* )} */}
          <Button
            isLink={false}
            color={"bg-redColor"}
            Icon={<BiSolidTrashAlt />}
            onClickFun={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Page>
        <PageTitle
          links={links}
          right={
            <>
              <div>
                <Button
                  isLink={false}
                  color={"bg-greenColor text-xl text-white"}
                  Icon={<IoAddCircleSharp />}
                  onClickFun={() => setIsAddModalOpen((prev) => !prev)}
                />
              </div>
              <div></div>
            </>
          }
        />
        <div className="my-4">
          <Table
            Title={"Admins Table"}
            columns={columns}
            translations={translations}
            data={delivery}
            hasEditPermission={true} // Assuming you have a way to determine this
            editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
            handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
            setSelectedItemsProp={setSelectedItems}
          />
        </div>
        {isModalOpen && (
          <ModalContainer
            direction={language === "ar" ? "rtl" : "ltr"}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            component={
              <EditDelivery
                data={clickedRow}
                countries={countries}
                states={states}
                cities={cities}
                getDelivery={getDelivery}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
        )}
        {isAddModalOpen && (
          <ModalContainer
            direction={language === "ar" ? "rtl" : "ltr"}
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
            component={
              <AddDelivery
                countries={countries}
                states={states}
                cities={cities}
                getDelivery={getDelivery}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
      </Page>
    </>
  );
}
