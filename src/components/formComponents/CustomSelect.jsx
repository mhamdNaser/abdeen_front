import { useEffect, useState } from "react";

const CustomSelect = ({
  selectIndex,
  styles,
  title,
  name,
  validationProps,
  register,
  field,
  errors,
  optionValue,
  optionText,
  setValue,
  trigger,
  fields,
  watch,
  selectedOptions,
  setSelectedOptions,
  readOnly,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const value = watch(field.name);
  useEffect(() => {
    if (value === null) {
      setSelectedOptions((prev) =>
        prev.map((ele, i) => (i === selectIndex ? [] : ele))
      );
    }
  }, [value]);

  useEffect(() => {
    if (field?.options) {
      const selectedOption = field?.options.find(
        (option) => option[optionValue] == field?.value
      );
      if (selectedOption) {
        if (field.onFieldChange && field.options) {
          field.onFieldChange(selectedOption?.id);
        }
        setSelectedOptions((prev) =>
          prev?.map((ele, i) => (i === selectIndex ? [selectedOption] : ele))
        );
      }
    }
  }, [field.options]);

  useEffect(() => {
    if (selectIndex) {
      setValue(name, selectedOptions[selectIndex]);
      trigger(name);
    }
  }, [selectedOptions]);

  const handleSelectOption = (option) => {
    // Check if the option is already selected
    const isSelected =
      selectedOptions &&
      selectedOptions[selectIndex]?.some(
        (selectedOption) => selectedOption[optionValue] === option[optionValue]
      );

    // If the selection is multiple
    if (field?.isMultiple) {
      // If the option is already selected, remove it
      if (isSelected) {
        setSelectedOptions((prevSelectedOptions) =>
          prevSelectedOptions.map((selectedOptionsArr, i) =>
            i === selectIndex
              ? selectedOptionsArr.filter(
                  (selectedOption) =>
                    selectedOption[optionValue] !== option[optionValue]
                )
              : selectedOptionsArr
          )
        );
        if (field?.onFieldChange) {
          field.onFieldChange(option);
        }
      } else {
        if (field?.onFieldChange) {
          field.onFieldChange(option);
        }
        // If the option is not selected, add it
        setSelectedOptions((prevSelectedOptions) =>
          prevSelectedOptions.map((selectedOptionsArr, i) =>
            i === selectIndex
              ? [...selectedOptionsArr, option]
              : selectedOptionsArr
          )
        );
      }
    } else {
      // If the selection is single
      if (isSelected) {
        // If the option is already selected, remove it
        setSelectedOptions((prev) =>
          prev.map((ele, i) =>
            i === selectIndex
              ? ele.filter(
                  (selectedOption) =>
                    selectedOption[optionValue] !== option[optionValue]
                )
              : ele
          )
        );

        // Update form value to null or empty string depending on your requirement
        setValue(name, null); // or setValue(name, '')
        trigger(name);
        // Call the onFieldChange callback function
        if (field?.onFieldChange) {
          field.onFieldChange(null, setValue, setSelectedOptions, selectIndex);
        }
      } else {
        // If the option is not selected, set it as the selected option
        setSelectedOptions((prev) =>
          prev.map((ele, i) => (i === selectIndex ? [option] : ele))
        );
      }
      // Update form value to null or empty string depending on your requirement
      setValue(name, option[optionValue]); // or setValue(name, '')
      trigger(name);
      // Call the onFieldChange callback function
      if (field?.onFieldChange) {
        field.onFieldChange(
          option[optionValue],
          setValue,
          setSelectedOptions,
          selectIndex
        );
      }
    }

    // Close the select options dropdown
    setIsOpen(false);
  };
  return (
    <div key={selectIndex} className={`input-field w-full ${styles}`}>
      <label htmlFor={name} dangerouslySetInnerHTML={{ __html: title }}></label>
      <div className="relative h-[48px] w-full bg-blocks-color border border-mainBorder rounded-md">
        <div
          className="w-full h-full  p-3 "
          {...register(name, validationProps)}
          onClick={() => (readOnly ? null : setIsOpen(!isOpen))}
        >
          {selectedOptions &&
          selectedOptions[selectIndex] &&
          selectedOptions[selectIndex].length > 0
            ? selectedOptions[selectIndex]
                ?.map((option) => option[optionText])
                .join(", ")
            : "Select option(s)"}
        </div>

        {isOpen && (
          <div className="absolute z-[100] w-full transition-all h-[150px] overflow-y-auto p-2 bg-blocks-color shadow-md">
            <input
              type="text"
              className="input-box w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col gap-2 my-2 w-full">
              {field?.options
                ?.filter((option) =>
                  option[optionText]
                    ?.toLowerCase()
                    ?.includes(searchTerm.toLowerCase())
                )
                .map((option, index) => (
                  <span
                    key={option[optionValue]}
                    className={`p-1 cursor-pointer ${
                      selectedOptions &&
                      selectedOptions[selectIndex] &&
                      selectedOptions[selectIndex].some(
                        (selectedOption) =>
                          selectedOption[optionValue] === option[optionValue]
                      )
                        ? "bg-greenColor text-white"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option[optionText]}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
      {errors && errors[name] && (
        <span className="red-text">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CustomSelect;
