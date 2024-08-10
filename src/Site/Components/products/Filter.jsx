import React, { useEffect, useState } from "react";
import { useTranslation } from "../../../provider/TranslationProvider";
import axiosClient from "../../../axios-client";

const Filter = ({ filters, setFilters, menuItems = [] , brands = [] }) => {
  const [categoriesItems, setcategoriesItem] = useState([]);
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

  useEffect(() => {
    axiosClient.get("site/filter-categories").then((res) => {
      setcategoriesItem(res.data.data);
    });
  }, []);

  const renderCategories = (categories, level = 0) => {
    return categories.map((item) => (
      <div key={item.id}>
        <div
          className="flex gap-2 py-1 items-center"
          style={{ marginInlineStart: level * 15 }}
        >
          <input
            type="checkbox"
            id={`category-${item.id}`}
            name="categories"
            value={item.en_name}
            onChange={handleFilterChange}
            className="form-checkbox h-4 w-4"
            checked={filters.categories.includes(item.en_name)}
          />
          <label htmlFor={`category-${item.id}`}>
            {language === "ar" ? item.ar_name : item.en_name}
          </label>
        </div>
        {item.children &&
          item.children.length > 0 &&
          renderCategories(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="p-4 space-y-4 bg-blocks-color">
      <div>
        {menuItems.length > 0 && (
          <label className="font-semibold block mb-2 text-start">
            {(translations && translations["Category"]) || "Category"}
            {" :"}
          </label>
        )}

        <div className="px-4">{renderCategories(categoriesItems)}</div>
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
            <div key={brand.id} className="flex py-1 gap-2 items-center">
              <input
                type="checkbox"
                id={`brand-${brand.id}`}
                name="brands"
                value={brand.en_name}
                onChange={handleFilterChange}
                className="form-checkbox h-4 w-4"
                checked={filters.brands.includes(brand.en_name)}
              />
              <label htmlFor={`brand-${brand.id}`}>
                {language === "ar" ? brand.ar_name : brand.en_name}
              </label>
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
          <div className="flex gap-2 py-1 items-center">
            <input
              type="radio"
              id="price-0-25"
              name="priceRange"
              value="0-25"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
              checked={filters.priceRange === "0-25"}
            />
            <label htmlFor="price-0-25">0 - 25</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              id="price-25-50"
              name="priceRange"
              value="25-50"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
              checked={filters.priceRange === "25-50"}
            />
            <label htmlFor="price-25-50">25 - 50</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              id="price-50-100"
              name="priceRange"
              value="50-100"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
              checked={filters.priceRange === "50-100"}
            />
            <label htmlFor="price-50-100">50 - 100</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              id="price-100-plus"
              name="priceRange"
              value="100+"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
              checked={filters.priceRange === "100+"}
            />
            <label htmlFor="price-100-plus">100+</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;

