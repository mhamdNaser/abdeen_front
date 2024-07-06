import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import ModalContainer from "../../../components/ModalContainer";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  BiSolidEditAlt,
  BiSolidTrashAlt,
  BiSolidShow,
  BiSolidFileExport,
  BiSolidUserPlus,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AddCountry from "./AddCountry";

export default function AllCountries() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState();
  const [selectedItems, setSelectedItems] = useState([]); // Add this state

  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    const res = await axiosClient.get("/admin/all-countries");
    setCountries(res?.data.data);
  };

  const deleteFunc = async (value) => {
    const id = toast.loading("Error , Check your input again...");
    const res = await axiosClient
      .get(`/admin/delete-country/${value}`)
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
          getCountries();
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
    try {
      getCountries();
    } catch (error) {
      console.error("Failed to fetch admins", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    getCountries();
    setDirection(localStorage.getItem("LANGUAGE") === "ar" ? "rtl" : "ltr");
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      theme: "dark",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFunc(id);
        getCountries();
      }
    });
  };

  const handleView = (id, country) => {
    navigate(`/admin/allstates/${id}/${country}`);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status !== 0 ? (
          <BiSolidCheckCircle className="text-greenColor" />
        ) : (
          <BiSolidXCircle />
        ),
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
          <Button
            isLink={false}
            color={"bg-blueColor"}
            Icon={<BiSolidShow />}
            onClickFun={() => handleView(row.id, row.name)}
          />
        </div>
      ),
    },
  ];

  const archiveSelectedItems = () => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .post("/admin/delete-countries", { array: selectedItems })
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
          getCountries();
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
      title: "counties table",
      url: "/admin/allcountries",
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
                  Icon={<BiSolidUserPlus />}
                  onClickFun={() => setIsAddModalOpen((prev) => !prev)}
                />
              </div>
              <div>
                <Button
                  isLink={false}
                  color={"bg-redColor text-xl text-white px-2"}
                  Icon={<BiSolidFileExport />}
                  onClickFun={archiveSelectedItems}
                />
              </div>
            </>
            // )
          }
        />
        {isModalOpen && (
          <ModalContainer
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            component={
              <EditAdmin
                data={clickedRow}
                getCountries={getCountries}
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
              <AddCountry
                getCountries={getCountries}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
        <div className="my-4">
          <Table
            direction={direction}
            columns={columns}
            data={countries}
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
