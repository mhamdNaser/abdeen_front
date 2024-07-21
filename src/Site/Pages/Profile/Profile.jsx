import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const { setBackground } = useOutletContext();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")));

  useEffect(() => {
    setBackground(false);
    return () => setBackground(true); // Cleanup function to reset the background when the component unmounts
  }, [setBackground]);
  return (
    <div className="flex xl:flex-row flex-col p-4 xl:p-10 gap-10">
      <div className="xl:w-1/3 w-full text-dark">
        {/* User Information Section */}
        <section className="mb-8">
          <div className="bg-white shadow-md rounded-lg p-4 ">
            <h2 className="text-2xl border-b py-3 font-semibold">
              User Information
            </h2>
            <div className="flex xl:flex-row flex-col gap-6 py-4">
              <img
                className="xl:h-40 xl:w-40 w-full"
                src={import.meta.env.VITE_WEBSITE_URL + user.image}
                alt={user.name}
              />
              <div className="flex flex-col-reverse xl:w-3/4 w-full gap-4">
                <p className="flex justify-between">
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="flex justify-between">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="flex justify-between">
                  <strong>Name:</strong> {user.name}
                </p>
                <p className="flex justify-between">
                  <strong>UserName:</strong> {user.username}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="xl:mb-8 mb-0">
          <h2 className="text-2xl font-semibold mb-2">Address</h2>
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col-reverse gap-4">
            <p className="flex justify-between">
              <strong>Country:</strong> {user.country}
            </p>
            <p className="flex justify-between">
              <strong>State:</strong> {user.state}
            </p>
            <p className="flex justify-between">
              <strong>City:</strong> {user.city}
            </p>
          </div>
        </section>

        {/* Additional Sections */}
        {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            Additional Information
          </h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p>
              <strong>Membership:</strong> Gold Member
            </p>
            <p>
              <strong>Joined Date:</strong> January 1, 2020
            </p>
          </div>
        </section> */}
      </div>
      <div className="xl:w-3/5 w-full">
        {/* Orders Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Orders</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <ul>
              <li className="mb-2">
                <strong>Order #1:</strong> Order details...
              </li>
              <li className="mb-2">
                <strong>Order #2:</strong> Order details...
              </li>
              <li className="mb-2">
                <strong>Order #3:</strong> Order details...
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
