import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReusableForm from "../../../components/ReusableForm";
import { useStateContext } from "../../../provider/ContextsProvider";
import axiosClient from "../../../axios-client";

export default function Login({ setIsAddModalOpen }) {
  const { token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const id = toast.loading("submitting, please wait...");
    const payload = {
      email: values.email,
      password: values.password,
    };
    axiosClient
      .post(import.meta.env.VITE_API_URL + "/site/login", payload)
      .then((response) => {
        toast.update(id, {
          render: response?.data?.message,
          type: "success",
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
        setToken(response.data.token);
        setUser(response.data.User);

        sessionStorage.setItem("mode", "light");
        localStorage.setItem("USER", JSON.stringify(response.data.User));
        if (!response.data.token) {
          toast.update(id, {
            render: response?.data?.message,
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
        } else {
          setIsAddModalOpen(false);
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
    title: "login",
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
    <ReusableForm
      template={template}
      onSubmit={handleLogin}
      btnText={"login"}
      btnWidth={"w-[150px]"}
    />
  );
}
