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
  BiSolidShow,
} from "react-icons/bi";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [language, setLanguage] = useState(localStorage.getItem("LANGUAGE"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [direction, setDirection] = useState();
  const [brands, setBrands] = useState();
  const [categories, setCategories] = useState();
  const navigate = useNavigate();

  const getProduct = async () => {
    const res = await axiosClient.get("/admin/all-products");
    setProducts(res.data.data);
  };

  const getBrands = async () => {
    const res = await axiosClient.get("/admin/all-brands");
    setBrands(res.data.data);
    console.log(brands);
  };

  const getCategories = async () => {
    const res = await axiosClient.get("/admin/all-categories");
    setCategories(res.data.data);
  };

  const deleteFunc = async (id) => {
    const res = await axiosClient
      .get(`/admin/delete-product/${id}`)
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
          getProduct();
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
      getProduct();
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    setDirection(language === "ar" ? "rtl" : "ltr");
    getCategories();
    getBrands();
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const changestatus = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/changestatus-product/${values}`)
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
          getProduct();
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
        getProduct();
      }
    });
  };

  const handleView = (id, name) => {
    navigate(`/admin/viewproduct/${id}/${name}`);
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
      name: "name",
      selector: (row) => (language === "ar" ? row.ar_name : row.en_name),
      minWidth: "15%",
    },
    {
      name: "brand",
      selector: (row) => (language === "ar" ? row.ar_brand : row.en_brand),
      minWidth: "15%",
    },
    {
      name: "category",
      selector: (row) =>
        language === "ar" ? row.ar_category : row.en_category,
      minWidth: "15%",
    },
    {
      name: "made_in",
      selector: (row) => row.made_in,
      minWidth: "15%",
    },
    {
      name: "Price",
      selector: (row) => row.public_price,
      minWidth: "15%",
    },
    {
      name: "quantity",
      selector: (row) => row.quantity,
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
          <Button
            isLink={false}
            color={"bg-blueColor"}
            Icon={<BiSolidShow />}
            onClickFun={() => handleView(row.id, row.en_name)}
          />
        </div>
      ),
    },
  ];

  const archiveSelectedItems = () => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .post("/admin/delete-products", { array: selectedItems })
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
          getProduct();
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
      title: "products table",
      url: "/admin/allproducts",
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
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            component={
              <EditProduct
                language={language}
                data={clickedRow}
                brands={brands}
                categories={categories}
                getProduct={getProduct}
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
              <AddProduct
                language={language}
                brands={brands}
                categories={categories}
                getProduct={getProduct}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
        <div className="my-4">
          <Table
            Title={"products Table"}
            direction={direction}
            columns={columns}
            data={products}
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
