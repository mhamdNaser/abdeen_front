import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import { useTranslation } from "../../../provider/TranslationProvider";
import { IoAddCircleSharp } from "react-icons/io5";
import ModalContainer from "../../../components/ModalContainer";
import Table from "../../../components/Table";
import axiosClient from "../../../axios-client";
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";
import { AddTax } from "./tax/AddTax";
import EditTax from "./tax/EditTax";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AllTax() {
  const { translations, language } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [clickedRow, setClickedRow] = useState();

  const getTax = () => {
    axiosClient.get("admin/all-tax").then((res) => {
      setDelivery(res.data.data);
    });
  };

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
        getTax();
      }
    });
  };

  const deleteFunc = async (id) => {
    const res = await axiosClient
      .get(`/admin/delete-tax/${id}`)
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
          getTax();
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
    getTax();
  }, []);

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: `${(translations && translations["Tax"]) || "Tax"}`,
      url: "/admin/tax",
      active: true,
    },
  ];

  const columns = [
    {
      name: "Tax",
      selector: (row) => parseFloat(row.tax).toFixed(2),
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
            // hasAddPermission && (
            <>
              <div>
                <Button
                  isLink={false}
                  color={"bg-greenColor text-xl text-white"}
                  Icon={<IoAddCircleSharp />}
                  onClickFun={() => setIsAddModalOpen((prev) => !prev)}
                />
              </div>
            </>
            // )
          }
        />
        <div className="my-4">
          <Table
            Title={"Tax Table"}
            translations={translations}
            columns={columns}
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
              <EditTax
                data={clickedRow}
                getTax={getTax}
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
              <AddTax getTax={getTax} setIsAddModalOpen={setIsAddModalOpen} />
            }
          />
        )}
      </Page>
    </>
  );
}
