import React from "react";

const Filter = ({ filters, setFilters, menuItems = [], brands = [] }) => {
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
        {menuItems.length > 0  && (
          <label className="font-semibold block mb-2 text-start">
            Category:
          </label>
        )}

        <div className="px-4">
          {menuItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="categories"
                value={item.en_name}
                onChange={handleFilterChange}
                className="form-checkbox h-4 w-4"
              />
              <label>{item.en_name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        {brands.length > 0  && (
          <label className="font-semibold block mb-2 text-start">Brand:</label>
        )}
        <div className="px-4">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="brands"
                value={brand.en_name}
                onChange={handleFilterChange}
                className="form-checkbox h-4 w-4"
              />
              <label>{brand.en_name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="font-semibold block mb-2 text-start">
          Price Range:
        </label>
        <div className="px-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="priceRange"
              value="0-25"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
            />
            <label>0 - 25</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="priceRange"
              value="25-50"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
            />
            <label>25 - 50</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="priceRange"
              value="50-100"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
            />
            <label>50 - 100</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="priceRange"
              value="100+"
              onChange={handlePriceChange}
              className="form-radio h-4 w-4"
            />
            <label>More than 100</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
