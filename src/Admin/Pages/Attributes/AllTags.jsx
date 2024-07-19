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
  BiSolidFileExport,
  BiSolidAlarmAdd,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import AddTag from "./AddTag";
import EditTag from "./EditTag";

export default function AllTags() {
  const { id, AttName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [Tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [direction, setDirection] = useState();
  const [language, setLanguage] = useState(localStorage.getItem("LANGUAGE"));

  const getTags = async () => {
    const res = await axiosClient.get(`/admin/all-tags-id/${id}`);
    setTags(res.data.data);
  };

  const deleteFunc = async (value) => {
    const id = toast.loading("Error , Check your input again...");
    const res = await axiosClient
      .get(`/admin/delete-tag/${value}`)
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
          getTags();
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

  const deleteSelectedItems = () => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .post("/admin/delete-tags", { array: selectedItems })
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
          getTags();
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
      getTags();
    } catch (error) {
      console.error("Failed to fetch Tags", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    setDirection(language === "ar" ? "rtl" : "ltr");
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const changestatus = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/changestatus-tag/${values}`)
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
          getTags();
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
        getTags();
      }
    });
  };

  const columns = [
    {
      name: "name",
      selector: (row) =>
        row.attribute.toUpperCase() === "COLOR" ? (
          <span className="flex items-center gap-2">
            <span
              style={{
                backgroundColor:
                  language === "ar" ? row.ar_description : row.en_description,
                borderRadius: "50%",
                display: "inline-block",
                width: "20px",
                height: "20px",
              }}
            ></span>
            {language === "ar" ? row.ar_name : row.en_name}
          </span>
        ) : language === "ar" ? (
          row.ar_name
        ) : (
          row.en_name
        ),
      minWidth: "15%",
    },
    {
      name: "description",
      selector: (row) =>
        language === "ar" ? row.ar_description : row.en_description,
      minWidth: "15%",
    },
    {
      name: "attribute",
      selector: (row) => row.attribute,
      minWidth: "15%",
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
      title: "Attributes table",
      url: "/admin/allattributes",
      active: false,
    },
    {
      title: `${AttName} Tags`,
      url: "/admin/allTags",
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
        {isModalOpen && (
          <ModalContainer
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            component={
              <EditTag
                attid={id}
                data={clickedRow}
                getTags={getTags}
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
              <AddTag
                attid={id}
                getTags={getTags}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
        <div className="my-4">
          <Table
            Title={"Tags Table"}
            direction={direction}
            columns={columns}
            data={Tags}
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
