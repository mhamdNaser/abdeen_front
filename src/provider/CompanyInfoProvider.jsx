import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios-client";

const CompanyInfoContext = createContext();

export const CompanyInfoProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axiosClient.get("admin/company/info");
        setCompanyInfo(response.data);
      } catch (error) {
        console.error("Error fetching company information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  return (
    <CompanyInfoContext.Provider value={{ companyInfo, loading }}>
      {children}
    </CompanyInfoContext.Provider>
  );
};

export const useCompanyInfo = () => {
  return useContext(CompanyInfoContext);
};
