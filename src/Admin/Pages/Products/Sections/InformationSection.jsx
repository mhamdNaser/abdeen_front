import React, { useState } from "react";
import { BiSolidUserCircle, BiSolidEditAlt } from "react-icons/bi";
import ModalContainer from "../../../../components/ModalContainer";
import EditInformation from "./../components/EditInformation";

export default function InformationSection({ product, saveProduct }) {
  const [language, setLanguage] = useState(localStorage.getItem("LANGUAGE"));
  const [editInformation, setEditInformation] = useState(false);
  const editBtnFun = () => {
    setEditInformation(true);
  };

  return (
    <>
      <section className="mb-8 sticky top-0">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            Product Information
            <button onClick={() => editBtnFun()}>
              <BiSolidEditAlt />
            </button>
          </h2>
          {product && (
            <div className="xl:flex flex-col gap-6 py-4">
              {product.image ? (
                <img
                  className="w-full mb-3"
                  src={`${import.meta.env.VITE_WEBSITE_URL}${product.image}`}
                  alt={product.en_name}
                />
              ) : (
                <BiSolidUserCircle className="h-40 w-40" />
              )}
              <div className="flex flex-col gap-4">
                <p className="flex justify-between">
                  <strong>Sku:</strong> {product.sku}
                </p>
                <p className="flex justify-between">
                  <strong>Arabic Name:</strong> {product.ar_name}
                </p>
                <p className="flex justify-between">
                  <strong>English Name:</strong> {product.en_name}
                </p>
                <p className="flex justify-between">
                  <strong>Status:</strong>{" "}
                  {product.status === 1 ? "Active" : "Not Active"}
                </p>
              </div>
            </div>
          )}
        </div>
        {editInformation && (
          <ModalContainer
            isModalOpen={editInformation}
            setIsModalOpen={setEditInformation}
            component={
              <EditInformation
                language={language}
                data={product}
                getProduct={saveProduct}
                setIsModalOpen={setEditInformation}
              />
            }
          />
        )}
      </section>
    </>
  );
}
