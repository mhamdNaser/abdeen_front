import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  BiSolidTrashAlt,
  BiSolidAnalyse,
  BiSolidFileExport,
} from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function UserArchives() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); 
  const { translations, language } = useTranslation();

  const getAdmins = async () => {
    const res = await axiosClient.get("/admin/user-archives");
    setAdmins(res.data.data);
  };

  const deleteFunc = async (value) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/delete-user/${value}`)
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
      .get(`/admin/reset-user/${value}`)
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
        getAdmins();
      }
    });
  };

  const deleteSelectedItems = () => {
    axiosClient
      .post("/admin/delete-users", { array: selectedItems })
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
      name: "UserName",
      selector: (row) => row.username,
      maxWidth: "15%",
    },
    {
      name: "Name",
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
      title: "Users Archive Table",
      url: "/admin/userarchives",
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
            Title={"Users Archive Table"}
            columns={columns}
            data={admins}
            translations={translations}
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
