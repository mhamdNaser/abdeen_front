import React, { useState, useEffect } from "react";
import axiosClient from "../../../../axios-client";
import { useTranslation } from "../../../../provider/TranslationProvider";

export default function StaticsCards({ statistics }) {
  const { translations } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold">
            {(translations && translations["Product Quantity"]) ||
              "Product Quantity"}
          </h3>
          <p className="text-3xl">{statistics.productCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold">
            {(translations && translations["User Number"]) || "User Number"}
          </h3>
          <p className="text-3xl">{statistics.userCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold">
            {(translations && translations["Orders Number"]) || "Orders Number"}
          </h3>
          <p className="text-3xl">{statistics.orderCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold">
            {(translations && translations["Admins Number"]) || "Admins Number"}
          </h3>
          <p className="text-3xl">{statistics.domainCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold">
            {(translations && translations["Categories Number"]) ||
              "Categories Number"}
          </h3>
          <p className="text-3xl">{statistics.categoryCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold">
            {(translations && translations["Brands Number"]) || "Brands Number"}
          </h3>
          <p className="text-3xl">{statistics.brandCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold">
            {(translations && translations["Orders Completed Values"]) ||
              "Orders Completed Values"}
          </h3>
          <p className="text-3xl">
            {statistics.totalCompletedOrderValue} <small>{" JD"}</small>
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-y-4">
          <h3 className="text-xl font-semibold">
            {(translations && translations["Orders Returned Values"]) ||
              "Orders Returned Values"}
          </h3>
          <p className="text-3xl">
            {statistics.totalReturnedOrderValue} <small>{" JD"}</small>
          </p>
        </div>
      </div>
    </div>
  );
}
