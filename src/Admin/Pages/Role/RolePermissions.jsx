import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../../axios-client";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import ReusableForm from "../../../components/ReusableForm";

export default function RolePermissions() {
  const { id } = useParams();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل

  const getPermissions = async () => {
    try {
      const res = await axiosClient.get(`/admin/show-role/${id}`);
      console.log("Response data:", res.data); // طباعة البيانات
      setPermissions(res.data.data);
    } catch (error) {
      console.error("Failed to fetch permissions", error);
    } finally {
      setLoading(false); // انتهاء التحميل
    }
  };

  useEffect(() => {
    getPermissions();
  }, [id]);

  const fields = permissions.map((ele) => ({
    type: "checkbox",
    name: ele.permissionName,
    title: ele.permissionName,
    value: ele.value === 1,
    checkboxStyle: true,
    styles: "lg:w-[24%] md:w-[32%] w-[49%]",
  }));

  const template = { fields };

  const onSubmit = async (values) => {
    const toastId = toast.loading("running...");
    const ids = Object.entries(values).map(([key, value]) => {
      const id = permissions.find((item) => item.permissionName === key).id;
      return { id, value: value === true };
    });

    const formData = new FormData();
    formData.append("permission[]", JSON.stringify(ids));

    try {
      const res = await axiosClient.post(
        `/admin/show-role-permissions/${id}`,
        formData
      );
      toast.update(toastId, {
        render: res.data.mes,
        type: res.data.success ? "success" : "error",
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
        closeOnClick: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Oops! something bad happened",
        type: "error",
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
        closeOnClick: true,
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
      title: "roles table",
      url: "/admin/allroles",
      active: false,
    },
    {
      title: "roles permission",
      url: "/admin/allroles",
      active: true,
    },
  ];

  if (loading) {
    return <Page>Loading...</Page>; // عرض رسالة التحميل
  }

  if (permissions.length === 0) {
    return <Page>No permissions found.</Page>; // عرض رسالة عند عدم وجود بيانات
  }

  return (
    <Page>
      <PageTitle links={links} />
      {permissions.length > 0 && (
        <ReusableForm
          template={template}
          onSubmit={onSubmit}
          addedStyles="w-[100%] mt-4"
          btnWidth="w-[150px]"
          btnText="Submit"
        />
      )}
    </Page>
  );
}
