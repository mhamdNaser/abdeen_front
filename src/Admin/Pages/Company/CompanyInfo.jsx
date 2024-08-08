import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import { toast } from "react-toastify";

export default function CompanyInfo() {
  const [formData, setFormData] = useState({
    logo: "",
    company_name: "",
    company_description_en: "",
    company_description_ar: "",
    location: "Jordan / Aqaba",
    phone_number: "",
    email: "",
    tax_number: "",
    commercial_register: "",
    license_number: "",
    license_date: "",
    license_expiry: "",
  });

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axiosClient.get("admin/company/info");
        if (response.data) {
          setFormData({
            logo: response.data.logo || "",
            company_name: response.data.company_name || "",
            company_description_en: response.data.company_description_en || "",
            company_description_ar: response.data.company_description_ar || "",
            location: response.data.location || "Jordan / Aqaba",
            phone_number: response.data.phone_number || "",
            email: response.data.email || "",
            tax_number: response.data.tax_number || "",
            commercial_register: response.data.commercial_register || "",
            license_number: response.data.license_number || "",
            license_date: response.data.license_date || "",
            license_expiry: response.data.license_expiry || "",
          });
        }
      } catch (error) {
        console.error("Error fetching company information:", error);
      }
    };

    fetchCompanyInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Error, Check your input again...");

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axiosClient.post(
        "/admin/company/store",
        formDataToSend
      );
      if (response.data.success === false) {
        toast.update(id, {
          type: "error",
          render: response.data.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      } else {
        toast.update(id, {
          type: "success",
          render: response.data.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      }
    } catch (err) {
      toast.update(id, {
        type: "error",
        render: err.response?.message || "Something went wrong!",
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  const links = [
    { title: "home", url: "/admin/", active: false },
    { title: "Users Table", url: "/admin/allusers", active: true },
  ];

  return (
    <Page>
      <PageTitle links={links} />
      <form
        onSubmit={handleSubmit}
        className="my-4 bg-white p-6 shadow-md rounded-lg"
      >
        <div className="container m-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Logo</label>
              <input
                className="input-box"
                type="file"
                name="logo"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Company Name</label>
              <input
                className="input-box"
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Company Description</label>
              <textarea
                className="input-box h-32"
                name="company_description_en"
                value={formData.company_description_en}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Company Description</label>
              <textarea
                className="input-box h-32"
                name="company_description_ar"
                value={formData.company_description_ar}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Location</label>
              <input
                className="input-box"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Phone Number</label>
              <input
                className="input-box"
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Email</label>
              <input
                className="input-box"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Tax Number</label>
              <input
                className="input-box"
                type="text"
                name="tax_number"
                value={formData.tax_number}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Commercial Register</label>
              <input
                className="input-box"
                type="text"
                name="commercial_register"
                value={formData.commercial_register}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">License Number</label>
              <input
                className="input-box"
                type="text"
                name="license_number"
                value={formData.license_number}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">License Date</label>
              <input
                className="input-box"
                type="date"
                name="license_date"
                value={formData.license_date}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">License Expiry</label>
              <input
                className="input-box"
                type="date"
                name="license_expiry"
                value={formData.license_expiry}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button
          className="my-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          type="submit"
        >
          Save Company Info
        </button>
      </form>
    </Page>
  );
}
