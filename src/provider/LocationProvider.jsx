import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios-client";

const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const res = await axiosClient.get("/site/all-countries");
      setCountries(res?.data?.data || []);
    };

    const getStates = async () => {
      const res = await axiosClient.get("/site/all-states");
      setStates(res?.data?.data || []);
    };

    const getCities = async () => {
      const res = await axiosClient.get("/site/all-cities");
      setCities(res?.data?.data || []);
    };

    getCountries();
    getStates();
    getCities();
  }, []);

  return (
    <LocationContext.Provider value={{ countries, states, cities }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
