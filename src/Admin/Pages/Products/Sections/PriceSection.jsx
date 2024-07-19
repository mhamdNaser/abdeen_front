import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import ModalContainer from "../../../../components/ModalContainer";
import EditDiscount from "./../components/EditDiscount";

export default function PriceSection({ product, saveProduct }) {
  const [language, setLanguage] = useState(localStorage.getItem("LANGUAGE"));
  const [editDiscount, setEditDiscount] = useState(false);
  const editDiscountBtnFun = () => {
    setEditDiscount(true);
  };
  return (
    <>
      <section className="mb-8">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            Price
          </h2>
          <div className="flex flex-col gap-4 py-2">
            <p className="flex justify-between">
              <strong>Price:</strong>
              <span>{product.cost_Price}</span>
            </p>
            <p className="flex justify-between">
              <strong>Quantity:</strong>
              <span>{product.quantity}</span>
            </p>
            <p className="flex justify-between pt-2 border-t border-gray-100">
              <strong>Total:</strong>
              <span>{product.quantity * product.cost_Price}</span>
            </p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            Discount
            <button onClick={() => editDiscountBtnFun()}>
              <BiSolidEditAlt />
            </button>
          </h2>
          <div className="flex flex-col gap-4 py-2">
            <p className="flex justify-between">
              <strong>Discount:</strong>
              <span>{product.discount} %</span>
            </p>
          </div>
        </div>
      </section>
      {editDiscount && (
        <ModalContainer
          isModalOpen={editDiscount}
          setIsModalOpen={setEditDiscount}
          component={
            <EditDiscount
              language={language}
              data={product}
              getProduct={saveProduct}
              setIsModalOpen={setEditDiscount}
            />
          }
        />
      )}
    </>
  );
}
