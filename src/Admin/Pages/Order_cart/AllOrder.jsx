import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import ModalContainer from "../../../components/ModalContainer";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  BiSolidEditAlt,
  BiSolidTrashAlt,
  BiSolidShow,
  BiSolidFileExport,
  BiSolidAlarmAdd,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";
// import AddBrand from "./AddBrand";
// import EditBrand from "./EditBrand";

export default function AllOrder() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [clickedRow, setClickedRow] = useState();
  const [loading, setLoading] = useState(true);
  const { translations, language } = useTranslation();
  const [order, setOrder] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const getOrder = () => {
    axiosClient.get(`admin/all-orders`).then((res) => {
      setOrder(res.data.data);
    });
  };

  const [direction, setDirection] = useState();

  // const deleteFunc = async (value) => {
  //   const id = toast.loading("Error , Check your input again...");
  //   const res = await axiosClient
  //     .get(`/admin/delete-brand/${value}`)
  //     .then((data) => {
  //       if (data.success === false) {
  //         toast.update(id, {
  //           type: "error",
  //           render: data.data.message,
  //           closeOnClick: true,
  //           isLoading: false,
  //           autoClose: true,
  //           closeButton: true,
  //           pauseOnHover: false,
  //         });
  //       } else {
  //         getBrands();
  //         toast.update(id, {
  //           type: "success",
  //           render: data.data.message,
  //           closeOnClick: true,
  //           isLoading: false,
  //           autoClose: true,
  //           closeButton: true,
  //           pauseOnHover: false,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       toast.update(id, {
  //         type: "error",
  //         render: err.response.message,
  //         closeOnClick: true,
  //         isLoading: false,
  //         autoClose: true,
  //         closeButton: true,
  //         pauseOnHover: false,
  //       });
  //     });
  // };

  useEffect(() => {
    try {
      getOrder();
    } catch (error) {
      console.error("Failed to fetch brands", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }
    setDirection(language === "ar" ? "rtl" : "ltr");
  }, []);

  // const editBtnFun = (row) => {
  //   setIsModalOpen(true);
  //   setClickedRow(row);
  // };

  // const changestatus = async (values) => {
  //   const id = toast.loading("Error , Check your input again...");
  //   axiosClient
  //     .get(`/admin/changestatus-brand/${values}`)
  //     .then((data) => {
  //       if (data.success === false) {
  //         toast.update(id, {
  //           type: "error",
  //           render: data.data.message,
  //           closeOnClick: true,
  //           isLoading: false,
  //           autoClose: true,
  //           closeButton: true,
  //           pauseOnHover: false,
  //         });
  //       } else {
  //         getBrands();
  //         toast.update(id, {
  //           type: "success",
  //           render: data.data.message,
  //           closeOnClick: true,
  //           isLoading: false,
  //           autoClose: true,
  //           closeButton: true,
  //           pauseOnHover: false,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       toast.update(id, {
  //         type: "error",
  //         render: err.response.message,
  //         closeOnClick: true,
  //         isLoading: false,
  //         autoClose: true,
  //         closeButton: true,
  //         pauseOnHover: false,
  //       });
  //     });
  // };

  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     theme: "dark",
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteFunc(id);
  //       getBrands();
  //     }
  //   });
  // };

  const columns = [
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
      selector: (row) => row.date,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Status"]) || "Status"}`,
      selector: (row) => (
        <div>
          {row.status === "pending" ? (
            <span className="bg-blueColor text-white py-1 px-2 rounded-lg text-xs">
              {row.status}
            </span>
          ) : (
            <BiSolidXCircle size={20} />
          )}
        </div>
      ),
      maxWidth: "15%",
    },
  ];

  // const archiveSelectedItems = () => {
  //   const id = toast.loading("Error , Check your input again...");
  //   axiosClient
  //     .post("/admin/delete-brands", { array: selectedItems })
  //     .then((data) => {
  //       if (data.success === false) {
  //         toast.update(id, {
  //           type: "error",
  //           render: data.data.message,
  //           closeOnClick: true,
  //           isLoading: false,
  //           autoClose: true,
  //           closeButton: true,
  //           pauseOnHover: false,
  //         });
  //       } else {
  //         getBrands();
  //         toast.update(id, {
  //           type: "success",
  //           render: data.data.message,
  //           closeOnClick: true,
  //           isLoading: false,
  //           autoClose: true,
  //           closeButton: true,
  //           pauseOnHover: false,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       toast.update(id, {
  //         type: "error",
  //         render: err.response.message,
  //         closeOnClick: true,
  //         isLoading: false,
  //         autoClose: true,
  //         closeButton: true,
  //         pauseOnHover: false,
  //       });
  //     });
  // };

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
      title: "brands table",
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
        {/* {isModalOpen && (
          <ModalContainer
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            component={
              <EditBrand
                data={clickedRow}
                countries={countries}
                getBrands={getBrands}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
        )}

        {isAddModalOpen && (
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
            Title={"brands Table"}
            direction={direction}
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
