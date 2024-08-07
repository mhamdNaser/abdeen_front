import React, { useEffect, useState } from "react";
import { Page } from "../../../components/StyledComponents";
import { BiSolidUserCircle } from "react-icons/bi";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { useTranslation } from "../../../provider/TranslationProvider";
import OrderTable from "../../../Site/Pages/Profile/OrderTable";
import AdminOrderTable from "./component/AdminOrderTable";

export default function UserProfile() {
  const { id, name } = useParams();
  const [admin, setUser] = useState([]);
  const { translations, language } = useTranslation();

  const saveadmin = () => {
    axiosClient.get(`admin/show-user/${id}`).then((data) => {
      setUser(data.data.admin);
    });
  };

  useEffect(() => {
    saveadmin();
  }, [setUser]);

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: "Users table",
      url: "/admin/allusers",
      active: false,
    },
    {
      title: `${name}`,
      url: "/admin/userProfile",
      active: true,
    },
  ];

  return (
    <>
      <Page>
        <PageTitle links={links} />
        <div className="flex 2xl:flex-row flex-col p-4 xl:p-10 gap-10">
          {!admin ? (
            <Loading />
          ) : (
            <div className="2xl:w-2/5 w-full text-dark">
              <section className="mb-8">
                <div className="bg-blocks-color shadow-md rounded-lg p-4 ">
                  <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                    {(translations && translations["User Information"]) ||
                      "User Information"}
                  </h2>
                  <div className="flex xl:flex-row flex-col gap-6 py-4">
                    {admin.image !== null ? (
                      <img
                        className="h-40 lg:w-40 sm:w-full"
                        src={import.meta.env.VITE_WEBSITE_URL + admin.image}
                        alt={admin.name}
                      />
                    ) : (
                      <BiSolidUserCircle className="h-40 w-40" />
                    )}
                    <div className="flex flex-col-reverse w-full gap-4">
                      <p className="flex justify-between">
                        <strong>
                          {" "}
                          {(translations && translations["Phone"]) || "Phone"}
                          {" : "}
                        </strong>{" "}
                        {admin.phone}
                      </p>
                      <p className="flex justify-between">
                        <strong>
                          {(translations && translations["Email"]) || "Email"}
                          {" : "}
                        </strong>{" "}
                        {admin.email}
                      </p>
                      <p className="flex justify-between">
                        <strong>
                          {(translations && translations["Name"]) || "Name"}
                          {" : "}
                        </strong>{" "}
                        {admin.name}
                      </p>
                      <p className="flex justify-between">
                        <strong>
                          {(translations && translations["UserName"]) ||
                            "UserName"}
                          {" : "}
                        </strong>{" "}
                        {admin.username}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="bg-blocks-color shadow-md rounded-lg p-4">
                  <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
                    {(translations && translations["Address"]) || "Address"}
                  </h2>
                  <div className="flex flex-col gap-4 py-2">
                    <p className="flex justify-between">
                      <strong>
                        {(translations && translations["Country"]) || "Country"}
                        {" : "}
                      </strong>{" "}
                      {admin.country}
                    </p>
                    <p className="flex justify-between">
                      <strong>
                        {(translations && translations["State"]) || "State"}
                        {" : "}
                      </strong>{" "}
                      {admin.state}
                    </p>
                    <p className="flex justify-between">
                      <strong>
                        {(translations && translations["City"]) || "City"}
                        {" : "}
                      </strong>{" "}
                      {admin.city}
                    </p>
                    <p className="flex justify-between">
                      <strong>
                        {" "}
                        {(translations && translations["address_1"]) ||
                          "address_1"}
                        {" : "}
                      </strong>{" "}
                      {admin.address_1}
                    </p>
                    <p className="flex justify-between">
                      <strong>
                        {" "}
                        {(translations && translations["address_2"]) ||
                          "address_2"}
                        {" : "}
                      </strong>{" "}
                      {admin.address_2}
                    </p>
                    <p className="flex justify-between">
                      <strong>
                        {" "}
                        {(translations && translations["address_3"]) ||
                          "address_3"}
                        {" : "}
                      </strong>{" "}
                      {admin.address_3}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}
          <section className="mb-8 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl border-b py-3 font-semibold mb-2">
              {(translations && translations["Orders"]) || "Orders"}
            </h2>
            <div className="">
              <AdminOrderTable userId={admin.id} username={admin.username} />
            </div>
          </section>
        </div>
      </Page>
    </>
  );
}
