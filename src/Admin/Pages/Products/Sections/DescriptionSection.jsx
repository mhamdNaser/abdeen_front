import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import ModalContainer from "../../../../components/ModalContainer";
import EditDescription from "./../components/EditDescription";
import { useTranslation } from "../../../../provider/TranslationProvider";

export default function DescriptionSection({ Product, saveProduct }) {
  const [editDescr, setEditDescr] = useState(false);
  const editDescrBtnFun = () => {
    setEditDescr(true);
  };
  const { translations, language } = useTranslation();
  return (
    <>
      <section className="mb-8">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            {(translations && translations["Description"]) || "Description"}
            <button onClick={() => editDescrBtnFun()}>
              <BiSolidEditAlt />
            </button>
          </h2>
          <div className="flex flex-col gap-4 py-2">
            <p className="flex flex-col">
              <strong>
                {(translations && translations["English Description"]) ||
                  "English Description"}
                {" : "}
              </strong>{" "}
              {Product.en_description}
            </p>
            <p className="flex flex-col">
              <strong>
                {(translations && translations["Arabic Description"]) ||
                  "Arabic Description"}
                {" : "}
              </strong>{" "}
              {Product.ar_description}
            </p>
          </div>
        </div>
      </section>
      {editDescr && (
        <ModalContainer
          direction={language === "ar" ? "rtl" : "ltr"}
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
