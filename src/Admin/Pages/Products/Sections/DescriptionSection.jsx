import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import ModalContainer from "../../../../components/ModalContainer";
import EditDescription from "./../components/EditDescription";

export default function DescriptionSection({ Product, saveProduct }) {
  const [language, setLanguage] = useState(localStorage.getItem("LANGUAGE"));
  const [editDescr, setEditDescr] = useState(false);
  const editDescrBtnFun = () => {
    setEditDescr(true);
  };
  return (
    <>
      <section className="mb-8">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            Product Description
            <button onClick={() => editDescrBtnFun()}>
              <BiSolidEditAlt />
            </button>
          </h2>
          <div className="flex flex-col gap-4 py-2">
            <p className="flex flex-col">
              <strong>English Description</strong> {Product.en_description}
            </p>
            <p className="flex flex-col">
              <strong>Arabic Description</strong> {Product.ar_description}
            </p>
          </div>
        </div>
      </section>
      {editDescr && (
        <ModalContainer
          isModalOpen={editDescr}
          setIsModalOpen={setEditDescr}
          component={
            <EditDescription
              language={language}
              data={Product}
              getProduct={saveProduct}
              setIsModalOpen={setEditDescr}
            />
          }
        />
      )}
    </>
  );
}
