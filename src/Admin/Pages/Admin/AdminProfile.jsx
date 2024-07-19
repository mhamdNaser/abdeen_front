import React, { useEffect, useState } from "react";
import { Page } from "../../../components/StyledComponents";
import { BiSolidUserCircle, BiSolidEditAlt } from "react-icons/bi";
import { EditAdmin } from "./EditAdmin";
import ModalContainer from "../../../components/ModalContainer";
import axiosClient from "../../../axios-client";
import EditAdrees from "./EditAdrees";
import { useParams } from "react-router-dom";
import { data } from "autoprefixer";
import PageTitle from "../../../components/PageTitle";

export default function Profile() {
  const { id, name } = useParams();
  const [admin, setUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const getRoles = async () => {
    const res = await axiosClient.get("/admin/all-roles");
    setRoles(res?.data.data);
  };

  const saveadmin = (admin) => {
    axiosClient.get(`admin/show-admin/${id}`).then((data) => { 
      setUser(data.data.admin)
    });
  };

  const getCountries = async () => {
    const res = await axiosClient.get("/admin/all-countries");
    setCountries(res?.data.data);
  };
  const getStates = async () => {
    const res = await axiosClient.get("/admin/all-states");
    setStates(res?.data.data);
  };
  const getCities = async () => {
    const res = await axiosClient.get("/admin/all-cities");
    setCities(res?.data.data);
  };

  useEffect(() => {
    saveadmin();
    getRoles();
    getCountries();
    getStates();
    getCities();
  }, [admin]);

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: "admins table",
      url: "/admin/alladmins",
      active: false,
    },
    {
      title: `${name}`,
      url: "/admin/adminProfile",
      active: true,
    },
  ];

  return (
    <>
      <Page>
        <PageTitle
          links={links}
        />
        <div className="flex p-10 gap-10">
          <div className="xl:w-2/5 lg:w-full text-dark">
            <section className="mb-8">
              <div className="bg-blocks-color shadow-md rounded-lg p-4 ">
                <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                  Admin Information
                </h2>
                <div className="xl:flex xl:flex-row sm:flex-col gap-6 py-4">
                  {admin.image !== null ? (
                    <img
                      className="h-40 lg:w-40 sm:w-full"
                      src={import.meta.env.VITE_WEBSITE_URL + admin.image}
                      alt={admin.name}
                    />
                  ) : (
                    <BiSolidUserCircle className="h-40 w-40" />
                  )}
                  <div className="flex flex-col-reverse gap-4">
                    <p>
                      <strong>Phone:</strong> {admin.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {admin.email}
                    </p>
                    <p>
                      <strong>Name:</strong> {admin.name}
                    </p>
                    <p>
                      <strong>UserName:</strong> {admin.username}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-blocks-color shadow-md rounded-lg p-4">
                <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                  Address
                </h2>
                <div className="flex flex-col gap-4 py-2">
                  <p>
                    <strong>Country:</strong> {admin.country}
                  </p>
                  <p>
                    <strong>State:</strong> {admin.state}
                  </p>
                  <p>
                    <strong>City:</strong> {admin.city}
                  </p>
                  <p>
                    <strong>address one:</strong> {admin.address_1}
                  </p>
                  <p>
                    <strong>address two:</strong> {admin.address_2}
                  </p>
                  <p>
                    <strong>address three:</strong> {admin.address_3}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        {isModalOpen && (
          <ModalContainer
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            component={
              <EditAdmin
                data={admin}
                roles={roles}
                setUser={saveadmin}
                countries={countries}
                states={states}
                cities={cities}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
        )}
        {addressModalOpen && (
          <ModalContainer
            isModalOpen={addressModalOpen}
            setIsModalOpen={setAddressModalOpen}
            component={
              <EditAdrees
                data={admin}
                setUser={saveadmin}
                countries={countries}
                states={states}
                cities={cities}
                setAddressModalOpen={setAddressModalOpen}
              />
            }
          />
        )}
      </Page>
    </>
  );
}
