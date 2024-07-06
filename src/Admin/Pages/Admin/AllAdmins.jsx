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
  BiSolidEditAlt,
  BiSolidTrashAlt,
  BiSolidShow,
  BiSolidFileExport,
  BiSolidUserPlus,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";
import { useNavigate } from "react-router-dom";

export default function AllAdmins() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // Add this state
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { translations } = useTranslation();

  const getRoles = async () => {
    const res = await axiosClient.get("/admin/all-roles");
    setRoles(res?.data.data);
  };

  const getCountries = async () => {
    const res = await axiosClient.get("/admin/all-countries");
    setCountries(res?.data.data);
  };
  const getStates = async () => {
    const res = await axiosClient.get("/admin/all-states");
    setStates(res?.data.data);
  };
  const getCities = async () => {
    const res = await axiosClient.get("/admin/all-cities");
    setCities(res?.data.data);
  };

  const getAdmins = async () => {
    const res = await axiosClient.get("/admin/all-admins");
    setAdmins(res?.data.data);
  };

  const deleteFunc = async (id) => {
    const res = await axiosClient
      .get(`/admin/softdelete-admin/${id}`)
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

    getRoles();
    getCountries();
    getStates();
    getCities();
  }, []);

  const handleView = (id, name) => {
    navigate(`/admin/adminProfile/${id}/${name}`);
  };

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const changestatus = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/changestatus-admin/${values}`)
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
      selector: (row) => row.role !== null ? row.role.name : "without role",
      maxWidth: "15%",
    },
    {
      name: "Status",
      selector: (row) => (
        <button onClick={() => changestatus(row.id)}>
          {row.status !== 0 ? (
            <BiSolidCheckCircle size={20} className="text-greenColor" />
          ) : (
            <BiSolidXCircle size={20} />
          )}
        </button>
      ),
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
          <Button
            isLink={false}
            color={"bg-blueColor"}
            Icon={<BiSolidShow />}
            onClickFun={() => handleView(row.id, row.username)}
          />
        </div>
      ),
    },
  ];

  const archiveSelectedItems = () => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .post("/admin/archive-admin-array", { array: selectedItems })
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
      title: "admins table",
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
                roles={roles}
                countries={countries}
                states={states}
                cities={cities}
                getAdmins={getAdmins}
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
              <AddAdmin
                getAdmins={getAdmins}
                roles={roles}
                countries={countries}
                states={states}
                cities={cities}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
        <div className="my-4">
          <Table
            Title={"Admins Table"}
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
