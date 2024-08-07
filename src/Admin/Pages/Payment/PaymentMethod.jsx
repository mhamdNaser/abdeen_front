import React, { useEffect, useState } from "react";
import {
  BiSolidChevronDown,
  BiSolidChevronUp,
  BiSolidTrashAlt,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";
import axiosClient from "../../../axios-client";
import { AddPaymentMethod } from "./component/AddPaymentMethod";
import { EditPaymentMethod } from "./component/EditPaymentMethod";
import useCheckPermission from "../../../hooks/checkPermissions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ModalContainer from "../../../components/ModalContainer";
import Button from "../../../components/Button";
import { Page } from "../../../components/StyledComponents";
import { useTranslation } from "../../../provider/TranslationProvider";
import PageTitle from "../../../components/PageTitle";

export default function PaymentMethod() {
  const { hasPermissionFun } = useCheckPermission();
  let hasAddPermission = hasPermissionFun("addPaymentmethod");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openedPaymentMethodIndex, setOpenedPaymentMethodIndex] =
    useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { translations, language } = useTranslation();
  const [languagedirection, setlanguagedirection] = useState(
    language === "ar" ? "rtl" : "ltr"
  );

  const handleInformationContainer = (index) => {
    openedPaymentMethodIndex === index
      ? setOpenedPaymentMethodIndex(null)
      : setOpenedPaymentMethodIndex(index);
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);


  const getPaymentMethods = async () => {
    try {
      const response = await axiosClient.get("/admin/paymentMethod");
      setPaymentMethods(response.data);
    } catch (error) {
      console.error(error);
    }
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
        deleteFun(id);
      }
    });
    };
    
    const changestatus = async (values) => {
      const id = toast.loading("Error , Check your input again...");
      axiosClient
        .get(`/admin/changestatus-paymentMethod/${values}`)
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
            getPaymentMethods();
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

  const deleteFun = async (id) => {
    const toastId = toast.loading("submitting, please wait...");
    try {
      // const user = await deleteMutation.mutateAsync(id);
      const res = await axiosClient.get(`/admin/paymentMethod/delete/${id}`);
      if (res.data.success) {
        getPaymentMethods();
        toast.update(toastId, {
          type: "success",
          render: res.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      } else {
        toast.update(toastId, {
          type: "error",
          render: res.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: `${
        (translations && translations["Payment Method"]) || "Payment Method"
      }`,
      url: "/admin/paymentmethod",
      active: true,
    },
  ];

  return (
    <div className="w-full">
      <Page>
        <PageTitle
          links={links}
          text={"manage all payment method"}
          right={
            hasAddPermission && (
              <div className="flex gap-4">
                <Button
                  isLink={false}
                  color={"bg-greenColor"}
                  title={"AddPayment"}
                  onClickFun={() => setIsAddModalOpen(true)}
                />
              </div>
            )
          }
        />
        {isAddModalOpen && (
          <ModalContainer
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
            component={
              <AddPaymentMethod
                getPaymentMethods={getPaymentMethods}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
        <div className="flex flex-col w-full m-auto gap-2 mt-6">
          {paymentMethods &&
            paymentMethods.map((paymentMethod, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-center gap-3 bg-blocks-color my-3 py-4 px-4"
              >
                <div
                  onClick={() => handleInformationContainer(index)}
                  className="flex flex-row justify-between cursor-pointer items-center w-full"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg">{paymentMethod.name}</h2>
                  </div>
                  <div className="flex gap-x-3">
                    <button
                      className="text-redColor text-sm w-fit py-1 px-1 rounded-full border border-redColor capitalize"
                      onClick={() => handleDelete(paymentMethod.id)}
                    >
                      <BiSolidTrashAlt />
                    </button>
                    <button
                      className={`border ${
                        paymentMethod.status === 1
                          ? "text-greenColor border-greenColor"
                          : "text-redColor border-redColor"
                      }  text-sm w-fit py-1 px-1 rounded-full `}
                      onClick={() => changestatus(paymentMethod.id)}
                    >
                      {paymentMethod.status !== 0 ? (
                        <BiSolidCheckCircle />
                      ) : (
                        <BiSolidXCircle />
                      )}
                    </button>
                    <button className="text-redColor w-fit py-1 px-1 rounded-full border border-redColor capitalize">
                      {openedPaymentMethodIndex === index ? (
                        <BiSolidChevronUp />
                      ) : (
                        <BiSolidChevronDown />
                      )}
                    </button>
                  </div>
                </div>
                {paymentMethod.mode !== null &&
                  openedPaymentMethodIndex === index && (
                    <div className="flex  flex-col gap-4  w-full px-1">
                      <EditPaymentMethod
                        data={paymentMethod}
                        getPaymentMethods={getPaymentMethods}
                        setIsAddModalOpen={setIsAddModalOpen}
                      />
                    </div>
                  )}
              </div>
            ))}
        </div>
      </Page>
    </div>
  );
}
