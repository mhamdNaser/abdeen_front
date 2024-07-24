import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import { useTranslation } from "../../../provider/TranslationProvider";
import { IoAddCircleSharp } from "react-icons/io5";
import ModalContainer from "../../../components/ModalContainer";
import { useLocation } from "../../../provider/LocationProvider";
import Table from "../../../components/Table";
import axiosClient from "../../../axios-client";
import { BiSolidEditAlt, BiSolidTrashAlt, BiSolidShow } from "react-icons/bi";
import { AddTax } from "./tax/AddTax";

export default function AllTax() {
  const { translations } = useTranslation();
  const { countries, states, cities } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const getTax = () => {
    axiosClient.get("admin/all-tax").then((res) => {
      setDelivery(res.data.data);
    });
  };

  useEffect(() => {
    getTax();
  }, []);

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: `${(translations && translations["Tax"]) || "Tax"}`,
      url: "/admin/tax",
      active: true,
    },
  ];

  const columns = [
    {
      name: "tax",
      selector: (row) => parseFloat(row.tax).toFixed(2),
      maxWidth: "15%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
          {/* {hasEditPermission && ( */}
          {/* <Button
            isLink={false}
            color={"bg-orangeColor"}
            Icon={<BiSolidEditAlt />}
            onClickFun={() => editBtnFun(row)}
          />
          <Button
            isLink={false}
            color={"bg-redColor"}
            Icon={<BiSolidTrashAlt />}
            onClickFun={() => handleDelete(row.id)}
          /> */}
        </div>
      ),
    },
  ];
  return (
    <>
      <Page>
        <PageTitle
          links={links}
          right={
            // hasAddPermission && (
            <>
              <div>
                <Button
                  isLink={false}
                  color={"bg-greenColor text-xl text-white"}
                  Icon={<IoAddCircleSharp />}
                  onClickFun={() => setIsAddModalOpen((prev) => !prev)}
                />
              </div>
            </>
            // )
          }
        />
        <div className="my-4">
          <Table
            Title={"Admins Table"}
            columns={columns}
            data={delivery}
            hasEditPermission={true} // Assuming you have a way to determine this
            editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
            handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
            setSelectedItemsProp={setSelectedItems}
          />
        </div>

        {isAddModalOpen && (
          <ModalContainer
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
            component={
              <AddTax
                countries={countries}
                states={states}
                cities={cities}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
      </Page>
    </>
  );
}