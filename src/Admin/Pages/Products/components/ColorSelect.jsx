import React from "react";
import Select from "react-select";

const ColorSelect = ({ options, onChange }) => {
  const customSingleValue = ({ data }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {data.attribute === "COLOR" && (
        <span
          style={{
            backgroundColor: data.color,
            borderRadius: "50%",
            display: "inline-block",
            width: "20px",
            height: "20px",
            marginRight: "10px",
          }}
        ></span>
      )}
      {data.label}
    </div>
  );

  const customOption = ({ innerRef, innerProps, data }) => (
    <div
      ref={innerRef}
      {...innerProps}
      style={{ display: "flex", alignItems: "center" }}
    >
      {data.attribute === "COLOR" && (
        <span
          style={{
            backgroundColor: data.color,
            borderRadius: "50%",
            display: "inline-block",
            width: "20px",
            height: "20px",
            marginRight: "10px",
          }}
        ></span>
      )}
      {data.label}
    </div>
  );

  return (
    <Select
      options={options}
      onChange={onChange}
      components={{ SingleValue: customSingleValue, Option: customOption }}
    />
  );
};

export default ColorSelect;
