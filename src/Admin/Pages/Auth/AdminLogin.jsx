import React from "react";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../provider/ContextsProvider";
import ReusableForm from "../../../components/ReusableForm";

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
      .then((res) => {
        console.log(res);
        
        if (res.data.success === false) {
          toast.update(id, {
            type: "error",
            render: res.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          toast.update(id, {
            type: "success",
            render: res.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
          if (res.data.admin) {
            setToken(res.data.token);
            setUser(res.data.admin);
            sessionStorage.setItem("mode", "light");
            localStorage.setItem("USER", JSON.stringify(res.data.admin));
            navigate("/admin/");
          }
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
      <div className="flex flex-col bg-dark-gray lg:w-[25%] md:w-[50%] w-[90%] rounded-xl p-6 component-shadow">
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
