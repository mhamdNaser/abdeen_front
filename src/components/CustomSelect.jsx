import React, { useState } from "react";

const CustomSelect = ({
  field,
  register,
  errors,
  selectedOptions,
  setSelectedOptions,
  optionValue,
  optionText,
  onSelectChange,
  translations,
}) => {
  const {
    title,
    name,
    validationProps,
    readOnly,
    disabled,
    options,
    isMultiple,
    styles,
  } = field;

  const [localSelectedValue, setLocalSelectedValue] = useState(
    isMultiple ? selectedOptions : selectedOptions[0] || ""
  );

  const handleChange = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setLocalSelectedValue(isMultiple ? value : value[0]);
    if (onSelectChange) {
      onSelectChange(name, isMultiple ? value : value[0]);
    }
  };

  return (
    <div className={`input-field w-full ${styles}`}>
      <label
        htmlFor={name}
        className="input-label"
        dangerouslySetInnerHTML={{
          __html: (translations && translations[`${title}`]) || title,
        }}
      ></label>
      <select
        name={name}
        id={name}
        multiple={isMultiple}
        disabled={disabled}
        readOnly={readOnly}
        {...register(name, validationProps)}
        onChange={handleChange}
        className="input-box bg-blocks-color"
        value={localSelectedValue}
      >
        {options?.map((option, index) => (
          <option key={index} value={option[optionValue]}>
            {option[optionText]}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <span className="red-text">{errors[name]["message"]}</span>
      )}
    </div>
  );
};

export default CustomSelect;
