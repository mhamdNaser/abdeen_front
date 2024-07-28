import React, { useState, useEffect } from "react";
import { useLocation } from "../../provider/LocationProvider";
import { useTranslation } from "../../provider/TranslationProvider";

const OrderAddressForm = ({ setAddress }) => {
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const { countries, states, cities } = useLocation();
  const { translations } = useTranslation();
  const [address, setLocalAddress] = useState({
    country_id: "",
    state_id: "",
    city_id: "",
    address_1: "",
    address_2: "",
    address_3: "",
  });

  const getAddress = (name, value) => {
      if (name === "country_id") {
        const filteredStates = states.filter(
          (state) => state.country_id == value
        );
        setStateOptions(filteredStates);
        const newAddress = { ...address, country_id: value };
        setLocalAddress(newAddress);
        setAddress(newAddress);
      } else if (name === "state_id") {
        const filteredStates = cities.filter(
          (cities) => cities.state_id == value
        );
        setCityOptions(filteredStates);
        const newAddress = { ...address, state_id: value };
        setLocalAddress(newAddress);
        setAddress(newAddress);
      } else if (name === "city_id") {
        const newAddress = { ...address, city_id: value };
        setLocalAddress(newAddress);
        setAddress(newAddress);
      } else if (name === "address_1") {
        const newAddress = { ...address, address_1: value };
        setLocalAddress(newAddress);
        setAddress(newAddress);
      } else if (name === "address_2") {
        const newAddress = { ...address, address_2: value };
        setLocalAddress(newAddress);
        setAddress(newAddress);
      } else if (name === "address_3") {
        const newAddress = { ...address, address_3: value };
        setLocalAddress(newAddress);
        setAddress(newAddress);
      }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">
        {(translations && translations["Address"]) || "Address"}
      </h2>
      <div className="flex flex-col gap-4">
        <select
          className="input-box w-full"
          name="country_id"
          id=""
          onChange={(e) => getAddress(e.target.name, e.target.value)}
        >
          <option disabled value="">
            {(translations && translations["select country"]) ||
              "select country"}
          </option>
          {countries &&
            countries.map((country, index) => (
              <option key={index} value={country.id}>
                {country.name}
              </option>
            ))}
        </select>
        <select
          className="input-box w-full"
          name="state_id"
          id=""
          onChange={(e) => getAddress(e.target.name, e.target.value)}
        >
          <option disabled value="">
            {(translations && translations["select state"]) || "select state"}
          </option>
          {stateOptions &&
            stateOptions.map((state, index) => (
              <option key={index} value={state.id}>
                {state.name}
              </option>
            ))}
        </select>
        <select
          className="input-box w-full"
          name="city_id"
          id=""
          onChange={(e) => getAddress(e.target.name, e.target.value)}
        >
          <option disabled value="">
            {(translations && translations["select city"]) || "select city"}
          </option>
          {cityOptions &&
            cityOptions.map((city, index) => (
              <option key={index} value={city.id}>
                {city.name}
              </option>
            ))}
        </select>
        <input
          className="input-box w-full"
          type="text"
          name="address_1"
          onChange={(e) => getAddress(e.target.name, e.target.value)}
        />
        <input
          className="input-box w-full"
          type="text"
          name="address_2"
          onChange={(e) => getAddress(e.target.name, e.target.value)}
        />
        <input
          className="input-box w-full"
          type="text"
          name="address_3"
          onChange={(e) => getAddress(e.target.name, e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrderAddressForm;
