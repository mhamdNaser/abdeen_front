import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "../../../provider/TranslationProvider";
import { BiSolidEditAlt } from "react-icons/bi";
import { EditProfileInformation } from "./EditProfileInformation";
import ModalContainer from "../../../components/ModalContainer";
import EditProfileAddress from "./EditProfileAddress";
import OrderTable from "./OrderTable";

export default function Profile() {
  const { setBackground } = useOutletContext();
  const [user, setUser] = useState({});
  const { translations, language } = useTranslation()
  const [openEditform, setOpenEditForm] = useState(false);
  const [openEditaddress, setOpenEditAddress] = useState(false);

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


  return (
    <div className="flex xl:flex-row flex-col p-4 xl:p-10 gap-10">
      <div className="xl:w-1/3 xl:min-w-fit-content w-full text-dark">
        {/* User Information Section */}
        <section className="mb-8">
          <div className="bg-white shadow-md rounded-lg p-4 ">
            <div className="flex justify-between border-b">
              <h2 className="text-2xl py-3 font-semibold">
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
                <p className="flex justify-between">
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
          <div className="flex justify-between border-b">
            <h2 className="text-2xl py-3 font-semibold mb-2">
              {(translations && translations["Address"]) || "Address"}
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
            <p className="flex justify-between">
              <strong>
                {(translations && translations["address_1"]) || "address_1"}
                {" : "}
              </strong>{" "}
              {user.address_1}
            </p>
            <p className="flex justify-between">
              <strong>
                {(translations && translations["address_2"]) || "address_2"}
                {" : "}
              </strong>{" "}
              {user.address_2}
            </p>
            <p className="flex justify-between">
              <strong>
                {(translations && translations["address_3"]) || "address_3"}
                {" : "}
              </strong>{" "}
              {user.address_3}
            </p>
          </div>
        </section>
      </div>
      <div className="xl:w-3/5 w-full">
        {/* Cards Section */}
        {/* <section className="mb-8 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 shadow-md rounded-lg px-8 py-6">
          <div className="bg-redColor w-full h-40 flex flex-col p-6 text-white font-bold">
            <h2>
              {(translations && translations["Product Like"]) || "Product Like"}
            </h2>
          </div>
          <div className="bg-redColor w-full h-40 flex flex-col p-6 text-white font-bold">
            <h2>
              {(translations && translations["Total Purchases"]) ||
                "Total Purchases"}
            </h2>
          </div>
          <div className="bg-redColor w-full h-40 flex flex-col p-6 text-white font-bold">
            <h2>
              {(translations && translations["Total Orders"]) || "Total Orders"}
            </h2>
          </div>
          <div className="bg-redColor w-full h-40 flex flex-col p-6 text-white font-bold">
            <h2>
              {(translations && translations["Customer Rating"]) ||
                "Customer Rating"}
            </h2>
          </div>
        </section> */}
        {/* Orders Section */}
        <section className="mb-8 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold mb-2">
            {(translations && translations["Orders"]) || "Orders"}
          </h2>
          <div className="">
            <OrderTable />
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
