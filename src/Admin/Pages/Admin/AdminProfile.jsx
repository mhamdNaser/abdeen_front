import React, { useEffect, useState } from "react";
import { Page } from "../../../components/StyledComponents";
import { BiSolidUserCircle, BiSolidEditAlt } from "react-icons/bi";
import { EditAdmin } from "./EditAdmin";
import ModalContainer from "../../../components/ModalContainer";
import axiosClient from "../../../axios-client";
import EditAdrees from "./EditAdrees";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function Profile() {
  const { id, name } = useParams();
  const [admin, setUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { translations, language } = useTranslation();

  const getRoles = async () => {
    const res = await axiosClient.get("/admin/all-roles");
    setRoles(res?.data.data);
  };

  const saveadmin = (admin) => {
    if (id) {
      axiosClient.get(`admin/show-admin/${id}`).then((data) => {
        setUser(data.data.admin);
      });
    } else {
      if (admin) {
        localStorage.setItem("USER", JSON.stringify(admin));
      }
      setUser(JSON.parse(localStorage.getItem("USER")));
    }
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
  }, []);

  useEffect(() => {
    getRoles();
  }, [admin]);

  useEffect(() => {
    getCountries();
    getStates();
    getCities();
  }, []);

  const editBtnFun = () => {
    setIsModalOpen(true);
  };

  const addressBtnFun = () => {
    setAddressModalOpen(true);
  };

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
    <div className="py-6">
      {name && <PageTitle links={links} />}
      <Page>
        <div className="flex p-10 gap-10">
          <div className="xl:w-2/5 lg:w-full text-dark">
            <section className="mb-8">
              <div className="bg-blocks-color shadow-md rounded-lg p-4 ">
                <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                  {(translations && translations[`Admin Information`]) ||
                    "Admin Information"}

                  {id || admin.id !== 1 ? (
                    <button onClick={() => editBtnFun()}>
                      <BiSolidEditAlt />
                    </button>
                  ) : null}
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
                  <div className="flex flex-col-reverse gap-4 w-full">
                    <p className="flex justify-between">
                      <strong>
                        {(translations && translations[`Phone`]) || "Phone"}
                        {" : "}
                      </strong>
                      {admin.phone}
                    </p>
                    <p className="flex justify-between">
                      <strong>
                        {(translations && translations[`Email`]) || "Email"}
                        {" : "}
                      </strong>
                      {admin.email}
                    </p>
                    <p className="flex justify-between">
                      <strong>
                        {(translations && translations[`Name`]) || "Name"}
                        {" : "}
                      </strong>
                      {admin.name}
                    </p>
                    <p className="flex justify-between">
                      <strong>
                        {(translations && translations[`UserName`]) ||
                          "UserName"}
                        {" : "}
                      </strong>
                      {admin.username}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-blocks-color shadow-md rounded-lg p-4">
                <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                  {(translations && translations[`Address`]) || "Address"}
                  <button onClick={() => addressBtnFun()}>
                    <BiSolidEditAlt />
                  </button>
                </h2>
                <div className="flex flex-col gap-4 py-2">
                  <p className="flex justify-between">
                    <strong>
                      {(translations && translations[`Country`]) || "Country"}
                      {" : "}
                    </strong>
                    {admin.country}
                  </p>
                  <p className="flex justify-between">
                    <strong>
                      {(translations && translations[`State`]) || "State"}
                      {" : "}
                    </strong>
                    {admin.state}
                  </p>
                  <p className="flex justify-between">
                    <strong>
                      {(translations && translations[`City`]) || "City"}
                      {" : "}
                    </strong>
                    {admin.city}
                  </p>
                  <p className="flex justify-between">
                    <strong>
                      {(translations && translations[`address_1`]) ||
                        "address_1"}
                      {" : "}
                    </strong>
                    {admin.address_1}
                  </p>
                  <p className="flex justify-between">
                    <strong>
                      {(translations && translations[`address_2`]) ||
                        "address_2"}
                      {" : "}
                    </strong>
                    {admin.address_2}
                  </p>
                  <p className="flex justify-between">
                    <strong>
                      {(translations && translations[`address_3`]) ||
                        "address_3"}
                      {" : "}
                    </strong>
                    {admin.address_3}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        {isModalOpen && (
          <ModalContainer
            direction={language === "ar" ? "rtl" : "ltr"}
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
            direction={language === "ar" ? "rtl" : "ltr"}
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
    </div>
  );
}
