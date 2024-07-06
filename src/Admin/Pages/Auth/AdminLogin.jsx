import React from "react";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../provider/ContextsProvider";
import ReusableForm from "../../../components/ReusableForm";

const getSideBar = () => {
  fetch("/Json/permissions.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("permissions", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export default function AdminLogin() {
  const { token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const id = toast.loading("submitting, please wait...");
    const payload = {
      email: values.email,
      password: values.password,
    };
    axiosClient
      .post(import.meta.env.VITE_API_URL + "/admin/login", payload)
      .then((response) => {
        toast.update(id, {
          render: response?.data?.message,
          type: "success",
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
        getSideBar();

        setToken(response.data.token);
        setUser(response.data.admin);

        sessionStorage.setItem("mode", "light");
        localStorage.setItem("USER", JSON.stringify(response.data.admin));
        if (!response.data.token) {
          toast.update(id, {
            render: response?.data?.message,
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
        } else {
          navigate("/admin/");
        }
      })
      .catch((err) => {
        toast.update(id, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
      });
  };

  const template = {
    title: "admin login",
    fields: [
      {
        title: "username",
        name: "email",
        type: "text",
      },
      {
        title: "password",
        name: "password",
        type: "password",
      },
    ],
  };

  return (
    <div className="flex flex-col text-dark justify-center items-center h-screen">
      <div className="lg:w-[25%] md:w-[50%] flex w-[90%] ">
        <img src="/image/logo.png" alt="Logo" className="max-w-[120px] py-4" />
      </div>
      <div className="flex flex-col lg:w-[25%] md:w-[50%] w-[90%] rounded-xl p-6 bg-gray-100 component-shadow">
        <ReusableForm
          template={template}
          onSubmit={handleLogin}
          btnText={"login"}
          btnWidth={"w-[150px]"}
        />
        <a href="" className="self-end mt-2 text-redColor">
          reset password
        </a>
      </div>
    </div>
  );
}
