import { useEffect, useState } from "react";

const CustomSelectForManyUses = ({
  styles,
  title,
  validationProps,
  register,
  errors,
  optionValue,
  optionText,
  setValue,
  trigger,
  watch,
  selectedOptions,
  setSelectedOptions,
  nameOfField,
  initialValue,
  options,
  onFieldChange,
  isMultiple,
}) => {
  const selectIndex = selectedOptions?.findIndex(
    (option) => option?.name === nameOfField
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //   const value = watch(nameOfField);

  //   useEffect(() => {
  //     if (value.length === 0) {
  //       setSelectedOptions((prev) =>
  //         prev.map((ele, i) => (i === selectIndex ? (ele.value = []) : ele))
  //       );
  //     }
  //   }, [value]);

  useEffect(() => {
    if (options) {
      const selectedOption = options.find(
        (option) => option[optionValue] == initialValue
      );
      if (selectedOption) {
        if (onFieldChange && options) {
          onFieldChange(selectedOption?.id);
        }
        setSelectedOptions((prev) =>
          prev.map((ele, i) =>
            i === selectIndex ? (ele.value = [selectedOption]) : ele
          )
        );
      }
    }
  }, [options]);

  const handleSelectOption = (option) => {
    // Check if the option is already selected
    const isSelected = selectedOptions[selectIndex].value?.some(
      (selectedOption) => selectedOption[optionValue] === option[optionValue]
    );
    // Call the onFieldChange callback function
    if (onFieldChange) {
      onFieldChange(
        option[optionValue],
        setValue,
        setSelectedOptions,
        selectIndex
      );
    }

    // If the option is already selected, remove it
    if (isSelected) {
      // If the selection is single, just set the selected option
      setSelectedOptions((prev) =>
        prev.map((ele, i) => {
          if (i === selectIndex) {
            // Check if value is an array before filtering
            const filteredValue = Array.isArray(ele.value)
              ? ele.value.filter(
                  (selectedOption) =>
                    selectedOption[optionValue] !== option[optionValue]
                )
              : ele.value;

            return {
              ...ele,
              value: filteredValue,
            };
          } else {
            return ele;
          }
        })
      );
      // Update form value to null or empty string depending on your requirement
      setValue(nameOfField, []); // or setValue(name, null)
      trigger(nameOfField);
      // Call the onFieldChange callback function
      if (onFieldChange) {
        onFieldChange({ id: [] });
      }
    } else {
      // If the selection is multiple
      if (isMultiple) {
        setSelectedOptions((prevSelectedOptions) => {
          const isOptionSelected = prevSelectedOptions[
            selectIndex
          ]?.value?.some(
            (selectedOption) =>
              selectedOption[optionValue] === option[optionValue]
          );

          if (isOptionSelected) {
            // If the option is already selected, remove it
            const updatedValue = prevSelectedOptions[selectIndex].value.filter(
              (selectedOption) =>
                selectedOption[optionValue] !== option[optionValue]
            );

            return prevSelectedOptions.map((ele, i) =>
              i === selectIndex ? { ...ele, value: updatedValue } : ele
            );
          } else {
            // If the option is not selected, add it
            const updatedValue = [
              ...(prevSelectedOptions[selectIndex].value || []),
              option,
            ];

            // Update form value
            setValue(nameOfField, updatedValue); // Assuming you want to store the option value

            // Manually trigger form validation
            trigger(nameOfField);
            return prevSelectedOptions.map((ele, i) =>
              i === selectIndex ? { ...ele, value: updatedValue } : ele
            );
          }
        });
      } else {
        // If the selection is single, just set the selected option
        setSelectedOptions((prev) =>
          prev.map((ele, i) =>
            i === selectIndex ? { ...ele, value: [option] } : ele
          )
        );

        // Update form value
        setValue(nameOfField, option[optionValue]); // Assuming you want to store the option value

        // Manually trigger form validation
        trigger(nameOfField);
      }
    }

    setIsOpen(false);
  };

  return (
    <div key={selectIndex} className={`input-field w-full ${styles}`}>
      <label htmlFor={nameOfField}>{title}</label>
      <div className="relative h-[48px] w-full bg-blocks-color border border-mainBorder rounded-md">
        <div
          className="w-full h-full  p-3 "
          {...register(nameOfField, validationProps)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions[selectIndex] &&
          selectedOptions[selectIndex]?.value?.length > 0
            ? selectedOptions[selectIndex].value
                ?.map((option) => option[optionText])
                .join(", ")
            : "Select option"}
        </div>{" "}
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
              {options
                ?.filter((option) =>
                  option[optionText]
                    ?.toLowerCase()
                    ?.includes(searchTerm.toLowerCase())
                )
                .map((option, index) => (
                  <span
                    key={index}
                    className={`p-1 cursor-pointer ${
                      selectedOptions[selectIndex] &&
                      selectedOptions[selectIndex].value?.some(
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
      {errors && errors[nameOfField] && (
        <span className="red-text">{errors[nameOfField]?.message}</span>
      )}
    </div>
  );
};

export default CustomSelectForManyUses;
