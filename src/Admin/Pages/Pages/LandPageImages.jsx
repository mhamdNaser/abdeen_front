import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import { toast } from "react-toastify";

export default function LandPageImages() {
  const [formData, setFormData] = useState({
    primary_image_1: "",
    secondary_image_1: "",
    secondary_image_2: "",
  });

  const [images, setImages] = useState({
    primary_image_1: "",
    secondary_image_1: "",
    secondary_image_2: "",
  });

  const fetchImages = async () => {
    try {
      const response = await axiosClient.get("admin/images/info");
      if (response.data) {
        setImages({
          primary_image_1: response.data.primary_image_1 || "",
          secondary_image_1: response.data.secondary_image_1 || "",
          secondary_image_2: response.data.secondary_image_2 || "",
        });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : formData[name],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Uploading images...");

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await axiosClient.post(
        "/admin/images/store",
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
        fetchImages();
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
        render: err.response?.data.message || "Something went wrong!",
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
    { title: "Images", url: "/admin/images", active: true },
  ];

  return (
    <Page>
      <PageTitle links={links} />
      <div className="my-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Current Images</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex flex-col items-center">
            {images.primary_image_1 && (
              <img
                src={import.meta.env.VITE_WEBSITE_URL + images.primary_image_1}
                alt="Primary Image 1"
                className="w-40 h-40 border-4 border-blue-500 rounded-lg mb-2"
              />
            )}
          </div>
          <div className="flex flex-col items-center">
            {images.secondary_image_1 && (
              <img
                src={
                  import.meta.env.VITE_WEBSITE_URL + images.secondary_image_1
                }
                alt="Secondary Image 2"
                className="w-40 h-40 border rounded-lg mb-2"
              />
            )}
          </div>
          <div className="flex flex-col items-center">
            {images.secondary_image_2 && (
              <img
                src={
                  import.meta.env.VITE_WEBSITE_URL + images.secondary_image_2
                }
                alt="Primary Image 3"
                className="w-40 h-40 border-4 rounded-lg mb-2"
              />
            )}
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="my-4 bg-white p-6 shadow-md rounded-lg"
      >
        <div className="container m-auto">
          <div className="mb-4">
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Primary Image 1</label>
              <input
                className="input-box"
                type="file"
                name="primary_image_1"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Secondary Image 1</label>
              <input
                className="input-box"
                type="file"
                name="secondary_image_1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-gray-700">Secondary Image 2</label>
              <input
                className="input-box"
                type="file"
                name="secondary_image_2"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button
          className="my-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          type="submit"
        >
          Save Images
        </button>
      </form>
    </Page>
  );
}
