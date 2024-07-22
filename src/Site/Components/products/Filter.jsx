import React from "react";
import { useTranslation } from "../../../provider/TranslationProvider";

const Filter = ({ filters, setFilters, menuItems = [], brands = [] }) => {
  const language = localStorage.getItem("LANGUAGE");
  const { translations } = useTranslation();
  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    let newFilters = { ...filters };

    if (checked) {
      newFilters[name] = [...newFilters[name], value];
    } else {
      newFilters[name] = newFilters[name].filter((item) => item !== value);
    }

    setFilters(newFilters);
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, priceRange: value });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        {menuItems.length > 0 && (
          <label className="font-semibold block mb-2 text-start">
            {(translations && translations["Category"]) || "Category"}
            {" :"}
          </label>
        )}

        <div className="px-4">
          {menuItems.map((item) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="categories"
                value={item.en_name}
                onChange={handleFilterChange}
                className="form-checkbox h-4 w-4"
              />
              <label>{language === "ar" ? item.ar_name : item.en_name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        {brands.length > 0 && (
          <label className="font-semibold block mb-2 text-start">
            {(translations && translations["Brand"]) || "Brand"}
            {" :"}
          </label>
        )}
        <div className="px-4">
          {brands.map((brand) => (
            <div key={brand.id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="brands"
                value={brand.en_name}
                onChange={handleFilterChange}
                className="form-checkbox h-4 w-4"
              />
              <label>{language === "ar" ? brand.ar_name : brand.en_name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="font-semibold block mb-2 text-start">
          {(translations && translations["Price Range"]) || "Price Range"}
          {" :"}
        </label>
        <div className="px-6">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="priceRange"
              value="0-25"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
            />
            <label>0 - 25</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="priceRange"
              value="25-50"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
            />
            <label>25 - 50</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="priceRange"
              value="50-100"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
            />
            <label>50 - 100</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              name="priceRange"
              value="100+"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
            />
            <label>Up 100</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
