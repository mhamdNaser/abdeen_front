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
} from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function ArchivesProducts() {
  const [clickedRow, setClickedRow] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [direction, setDirection] = useState();
  const [brands, setBrands] = useState();
  const [categories, setCategories] = useState();
  const { translations, language } = useTranslation();

  const getProduct = async () => {
    const res = await axiosClient.get("/admin/all-archives-products");
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
      .get(`/admin/delete-archiveproduct/${id}`)
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

    setDirection(localStorage.getItem("LANGUAGE") === "ar" ? "rtl" : "ltr");
    getCategories();
    getBrands();
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
        getProduct();
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
      name: "Brand",
      selector: (row) => (language === "ar" ? row.ar_brand : row.en_brand),
      minWidth: "15%",
    },
    {
      name: "Category",
      selector: (row) =>
        language === "ar" ? row.ar_category : row.en_category,
      minWidth: "15%",
    },
    {
      name: "made in",
      selector: (row) => row.made_in,
      minWidth: "15%",
    },
    {
      name: "Cost Price",
      selector: (row) => row.cost_Price,
      minWidth: "15%",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      minWidth: "15%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
          {/* {hasEditPermission && ( */}
          <Button
            isLink={false}
            color={"bg-greenColor"}
            Icon={<BiSolidAnalyse />}
            onClickFun={() => returnProduct(row.id)}
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

  const returnProduct = (value) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .post(`/admin/recover-product/${value}`)
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

  const archiveSelectedItems = () => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .post("/admin/delete-products-array", { array: selectedItems })
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
      title: "Products Archive Table",
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
            <>
              <div>
                <Button
                  isLink={false}
                  color={"bg-redColor text-xl text-white px-2"}
                  Icon={<BiSolidTrashAlt />}
                  onClickFun={archiveSelectedItems}
                />
              </div>
            </>
          }
        />
        <div className="my-4">
          <Table
            Title={"Products Archive Table"}
            direction={direction}
            translations={translations}
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
