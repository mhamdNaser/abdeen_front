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
  BiSolidAlarmAdd,
  BiSolidFileExport,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function AllCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [categories, setCategories] = useState([]);
  const [categorieslist, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const { translations, language } = useTranslation();
  

  const getCategories = async () => {
    const res = await axiosClient.get("/admin/all-categories");
    setCategories(res.data.data);
  };
  const [direction, setDirection] = useState();
  const getCategorieslist = async () => {
    const res = await axiosClient.get("/admin/all-categories-list");
    setCategoriesList(res.data.data);
  };

  const deleteFunc = async (id) => {
    const res = await axiosClient
      .get(`/admin/delete-category/${id}`)
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
          getCategories();
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
      getCategories();
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    setDirection(language === "ar" ? "rtl" : "ltr");
    getCategorieslist();
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const changestatus = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/changestatus-category/${values}`)
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
          getCategories();
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

  const changeView = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/changeview-category/${values}`)
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
          getCategories();
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
        getCategories();
      }
    });
  };

  const columns = [
    {
      name: "image",
      selector: (row) => (
        <img
          src={import.meta.env.VITE_WEBSITE_URL + row.image}
          alt={row.name}
          className="w-16 h-16 object-cover rounded-full"
        />
      ),
      minWidth: "15%",
    },
    {
      name: "Name",
      selector: (row) => (language === "ar" ? row.ar_name : row.en_name),
      minWidth: "15%",
    },
    {
      name: "Description",
      selector: (row) =>
        language === "ar" ? row.ar_description : row.en_description,
      minWidth: "15%",
    },
    {
      name: "Parent",
      selector: (row) =>
        row.parent === null
          ? "no parent"
          : language === "ar"
          ? row.ar_parent
          : row.en_parent,
      minWidth: "15%",
    },
    {
      name: "Show In Menu",
      selector: (row) => (
        <button onClick={() => changeView(row.id)}>
          {row.in_menu !== 0 ? (
            <BiSolidCheckCircle size={20} className="text-greenColor" />
          ) : (
            <BiSolidXCircle size={20} />
          )}
        </button>
      ),
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
        </div>
      ),
    },
  ];

  const archiveSelectedItems = () => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .post("/admin/delete-categories", { array: selectedItems })
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
          getCategories();
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
      title: "Categories Table",
      url: "/admin/allcategories",
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
                  onClickFun={archiveSelectedItems}
                />
              </div>
            </>
            // )
          }
        />
        {isModalOpen && (
          <ModalContainer
            direction={language === "ar" ? "rtl" : "ltr"}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            component={
              <EditCategory
                data={clickedRow}
                getCategorieslist={getCategorieslist}
                categories={categorieslist}
                getCategories={getCategories}
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
              <AddCategory
                getCategorieslist={getCategorieslist}
                categories={categorieslist}
                getCategories={getCategories}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
        <div className="my-4">
          <Table
            Title={"Categories Table"}
            direction={direction}
            translations={translations}
            columns={columns}
            data={categories}
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
