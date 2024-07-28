import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import ModalContainer from "../../../../components/ModalContainer";
import EditDiscount from "./../components/EditDiscount";
import { useTranslation } from "../../../../provider/TranslationProvider";
import EditPrice from "../components/EditPrice";

export default function PriceSection({ product, saveProduct }) {
  const [editDiscount, setEditDiscount] = useState(false);
  const editDiscountBtnFun = () => {
    setEditDiscount(true);
  };
  const [editPrice, setEditPrice] = useState(false);
  const editPriceBtnFun = () => {
    setEditPrice(true);
  };
  const { translations, language } = useTranslation();
  return (
    <>
      <section className="mb-8">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            {(translations && translations["Price"]) || "Price"}
            <button onClick={() => editPriceBtnFun()}>
              <BiSolidEditAlt />
            </button>
          </h2>
          <div className="flex flex-col gap-4 py-2">
            <p className="flex justify-between">
              <strong>
                {(translations && translations["Cost Price"]) || "Cost Price"}
                {" : "}
              </strong>
              <span>{parseFloat(product.cost_Price).toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <strong>
                {(translations && translations["Quantity"]) || "Quantity"}
                {" : "}
              </strong>
              <span>{product.quantity}</span>
            </p>
            <p className="flex justify-between pt-2 border-t border-gray-100">
              <strong>
                {(translations && translations["Total Price"]) || "Total Price"}
                {" : "}
              </strong>
              <span>
                {parseFloat(product.quantity * product.cost_Price).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            {(translations && translations["Discount"]) || "Discount"}
            <button onClick={() => editDiscountBtnFun()}>
              <BiSolidEditAlt />
            </button>
          </h2>
          <div className="flex flex-col gap-4 py-2">
            <p className="flex justify-between">
              <strong>
                {(translations && translations["Discount"]) || "Discount"}
                {" : "}
              </strong>
              <span>{product.discount} %</span>
            </p>
          </div>
        </div>
      </section>
      {editDiscount && (
        <ModalContainer
          direction={language === "ar" ? "rtl" : "ltr"}
          isModalOpen={editDiscount}
          setIsModalOpen={setEditDiscount}
          component={
            <EditDiscount
              data={product}
              getProduct={saveProduct}
              setIsModalOpen={setEditDiscount}
            />
          }
        />
      )}
      {editPrice && (
        <ModalContainer
          direction={language === "ar" ? "rtl" : "ltr"}
          isModalOpen={editPrice}
          setIsModalOpen={setEditPrice}
          component={
            <EditPrice
              data={product}
              getProduct={saveProduct}
              setIsModalOpen={setEditPrice}
            />
          }
        />
      )}
    </>
  );
}
