import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "../../../provider/TranslationProvider";
import { BiSolidEditAlt, BiSolidXCircle } from "react-icons/bi";
import axiosClient from "../../../axios-client";
import Table from "../../../components/Table";
import { EditProfileInformation } from "./EditProfileInformation";
import ModalContainer from "../../../components/ModalContainer";
import EditProfileAddress from "./EditProfileAddress";

export default function Profile() {
  const { setBackground } = useOutletContext();
  const [user, setUser] = useState({});
  const { translations, language } = useTranslation();
  const [order, setOrder] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openEditform, setOpenEditForm] = useState(false);
  const [openEditaddress, setOpenEditAddress] = useState(false);

  const getOrder = () => {
    axiosClient.get(`site/show-oreders/${user?.id}`).then((res) => {
      setOrder(res.data.data);
    });
  };

  const updateUser = (value) => { 
    if (value) {
      localStorage.setItem("USER", JSON.stringify(value));
      setUser(value);
    } else {
      setUser(JSON.parse(localStorage.getItem("USER")));
    }
  }


  useEffect(() => {
    updateUser();
    setBackground(false);
    return () => setBackground(true); // Cleanup function to reset the background when the component unmounts
  }, [setBackground]);

  useEffect(() => {
    if (user?.id) {
      getOrder();
    }
  }, [user]);

  const columns = [
    {
      name: `${(translations && translations["Price"]) || "Price"}`,
      selector: (row) => row.price,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Tax"]) || "Tax"}`,
      selector: (row) => parseFloat(row.tax).toFixed(2),
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Delivery"]) || "Delivery"}`,
      selector: (row) => row.delivery,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Total Price"]) || "Total Price"}`,
      selector: (row) =>
        parseFloat(row.price + row.delivery + row.tax).toFixed(2),
      minWidth: "15%",
    },
    {
      name: `${
        (translations && translations["Total Discount"]) || "Total Discount"
      }`,
      selector: (row) => row.total_discount,
      minWidth: "15%",
    },
    {
      name: `${
        (translations && translations["The net amount"]) || "The net amount"
      }`,
      selector: (row) => row.total_price,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Date"]) || "Date"}`,
      selector: (row) => row.date,
      minWidth: "15%",
    },
    {
      name: `${(translations && translations["Status"]) || "Status"}`,
      selector: (row) => (
        <div>
          {row.status === "pending" ? (
            <span className="bg-blueColor text-white py-1 px-2 rounded-lg text-xs">
              {row.status}
            </span>
          ) : (
            <BiSolidXCircle size={20} />
          )}
        </div>
      ),
      maxWidth: "15%",
    },
  ];

  return (
    <div className="flex xl:flex-row flex-col p-4 xl:p-10 gap-10">
      <div className="xl:w-1/3 xl:min-w-fit w-full text-dark">
        {/* User Information Section */}
        <section className="mb-8">
          <div className="bg-white shadow-md rounded-lg p-4 ">
            <div className="flex justify-between">
              <h2 className="text-2xl border-b py-3 font-semibold">
                {(translations && translations["User Information"]) ||
                  "User Information"}
              </h2>
              <button onClick={() => setOpenEditForm(true)}>
                <BiSolidEditAlt />
              </button>
            </div>
            <div className="flex xl:flex-row flex-col gap-6 py-4">
              <img
                className="xl:h-40 xl:w-40 w-full"
                src={import.meta.env.VITE_WEBSITE_URL + user.image}
                alt={user.name}
              />
              <div className="flex flex-col-reverse w-full gap-4">
                <p className="flex w-full justify-between">
                  <strong>
                    {(translations && translations["Phone"]) || "Phone"}
                    {" : "}
                  </strong>{" "}
                  {user.phone}
                </p>
                <p className="flex justify-between">
                  <strong>
                    {(translations && translations["Email"]) || "Email"}
                    {" : "}
                  </strong>{" "}
                  {user.email}
                </p>
                <p className="flex justify-between">
                  <strong>
                    {(translations && translations["Name"]) || "Name"}
                    {" : "}
                  </strong>{" "}
                  {user.name}
                </p>
                <p className="flex justify-between">
                  <strong>
                    {" "}
                    {(translations && translations["UserName"]) || "UserName"}
                    {" : "}
                  </strong>{" "}
                  {user.username}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="xl:mb-8 mb-0 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between">
            <h2 className="text-2xl border-b py-3 font-semibold mb-2">
              {(translations && translations["Address"]) || "Address"}
              {" : "}
            </h2>
            <button onClick={() => setOpenEditAddress(true)}>
              <BiSolidEditAlt />
            </button>
          </div>
          <div className=" flex flex-col gap-4">
            <p className="flex justify-between">
              <strong>
                {(translations && translations["Country"]) || "Country"}
                {" : "}
              </strong>{" "}
              {user.country}
            </p>
            <p className="flex justify-between">
              <strong>
                {(translations && translations["State"]) || "State"}
                {" : "}
              </strong>{" "}
              {user.state}
            </p>
            <p className="flex justify-between">
              <strong>
                {(translations && translations["City"]) || "City"}
                {" : "}
              </strong>{" "}
              {user.city}
            </p>
            {user.address_1 && (
              <p className="flex justify-between">
                <strong>
                  {(translations && translations["address_1"]) || "address_1"}
                  {" : "}
                </strong>{" "}
                {user.address_1}
              </p>
            )}
            {user.address_2 && (
              <p className="flex justify-between">
                <strong>
                  {(translations && translations["address_2"]) || "address_2"}
                  {" : "}
                </strong>{" "}
                {user.address_2}
              </p>
            )}
            {user.address_3 && (
              <p className="flex justify-between">
                <strong>
                  {(translations && translations["address_3"]) || "address_3"}
                  {" : "}
                </strong>{" "}
                {user.address_3}
              </p>
            )}
          </div>
        </section>
      </div>
      <div className="xl:w-3/5 w-full">
        {/* Orders Section */}
        <section className="mb-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold mb-2">
            {(translations && translations["Orders"]) || "Orders"}
            {" : "}
          </h2>
          <div className="">
            <Table
              Title={
                (translations && translations["orders Table"]) || "orders Table"
              }
              // direction={direction}
              columns={columns}
              data={order}
              print={false}
              hasEditPermission={true} // Assuming you have a way to determine this
              editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
              handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
              setSelectedItemsProp={setSelectedItems}
            />
          </div>
        </section>
      </div>
      {openEditform && (
        <ModalContainer
          isModalOpen={openEditform}
          setIsModalOpen={setOpenEditForm}
          component={
            <EditProfileInformation
              data={user}
              getUser={updateUser}
              setIsModalOpen={setOpenEditForm}
            />
          }
        />
      )}
      {openEditaddress && (
        <ModalContainer
          isModalOpen={openEditaddress}
          setIsModalOpen={setOpenEditAddress}
          component={
            <EditProfileAddress
              data={user}
              getUser={updateUser}
              setIsModalOpen={setOpenEditAddress}
            />
          }
        />
      )}
    </div>
  );
}
