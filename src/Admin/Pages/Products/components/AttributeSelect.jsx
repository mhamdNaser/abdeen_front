import React from "react";
import Select from "react-select";

const AttributeSelect = ({ attributes, onSelectAttribute }) => {
  const attributeOptions = attributes.map((attribute) => ({
    value: attribute.id,
    label: `${attribute.en_name} { ${attribute.ar_name} }`,
  }));

  const handleChange = (selectedOption) => {
    onSelectAttribute(selectedOption.value);
  };

  return (
    <Select
      options={attributeOptions}
      onChange={handleChange}
      isSearchable={true} 
    />
  );
};

export default AttributeSelect;
