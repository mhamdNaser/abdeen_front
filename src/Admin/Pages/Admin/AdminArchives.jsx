import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import ModalContainer from "../../../components/ModalContainer";
import { EditAdmin } from "./EditAdmin";
import { AddAdmin } from "./AddAdmin";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  BiSolidTrashAlt,
  BiSolidAnalyse,
  BiSolidFileExport,
} from "react-icons/bi";

export default function AdminArchives() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // Add this state

  const getAdmins = async () => {
    const res = await axiosClient.get("/admin/admin-archives");
    setAdmins(res.data.data);
  };

  const deleteFunc = async (value) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/delete-admin/${value}`)
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
          getAdmins();
          setIsAddModalOpen((prev) => !prev);
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

  const handleView = async (value) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/reset-admin/${value}`)
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
          getAdmins();
          setIsAddModalOpen((prev) => !prev);
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
      getAdmins();
    } catch (error) {
      console.error("Failed to fetch admins", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);

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
        getAdmins();
      }
    });
  };

  const deleteSelectedItems = () => {
    axiosClient
      .post("/admin/delete-admins", { array: selectedItems })
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
          getAdmins();
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
      name: "Username",
      selector: (row) => row.username,
      maxWidth: "15%",
    },
    {
      name: "Full Name",
      selector: (row) => row.name,
      maxWidth: "15%",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      maxWidth: "15%",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      maxWidth: "15%",
    },
    {
      name: "Role",
      selector: (row) => (row.role !== null ? row.role.name : "without role"),
      maxWidth: "15%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
          <Button
            isLink={false}
            color={"bg-redColor"}
            Icon={<BiSolidTrashAlt />}
            onClickFun={() => handleDelete(row.id)}
          />
          <Button
            isLink={false}
            color={"bg-greenColor"}
            Icon={<BiSolidAnalyse />}
            onClickFun={() => handleView(row.id)}
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
      title: "admins archives",
      url: "/admin/alladmins",
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
                  color={"bg-redColor text-xl text-white px-2"}
                  Icon={<BiSolidFileExport />}
                  onClickFun={deleteSelectedItems}
                />
              </div>
            </>
            // )
          }
        />
        <div className="my-4">
          <Table
            Title={"Admins Archives Table"}
            columns={columns}
            data={admins}
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
