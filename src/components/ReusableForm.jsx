import React from "react";
import FormField from "./FormField";
import useCustomForm from "../hooks/useCustomForm";

const ReusableForm = ({
  template,
  onSubmit,
  watchFields,
  validate, // Assuming validate is passed correctly as a function
  btnWidth,
  btnText,
  addedStyles,
  setImage,
  image,
  formType,
  onSelectChange,
}) => {
  const { title, fields } = template;

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    selectedOptions,
    setSelectedOptions,
  } = useCustomForm(fields, watchFields, validate);

  const handleFileChange = (name) => (event) => {
    const fileInput = event.target;
    const image = document.getElementById("imageFile");
    setImage(event.target.files[0]);
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (/^image/.test(fileInput.files[0].type)) {
          image.src = e.target.result;
          clearErrors(name); // Assuming clearErrors function is defined
        } else {
          alert("Selected file is not an image!");
        }
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  return (
    <form
      className={`${addedStyles} flex flex-col gap-4 text-primary-text w-auto`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3
        dangerouslySetInnerHTML={{ __html: title }}
        className="font-bold text-2xl bt-3"
      ></h3>
      <div className="flex gap-2 flex-wrap justify-between">
        {fields.map((field, i) => (
          <FormField
            key={field.name}
            field={field}
            register={register}
            errors={errors}
            handleFileChange={handleFileChange}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            image={image}
            onSelectChange={onSelectChange}
          />
        ))}
      </div>
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={`bg-redColor text-white p-2 outline-none border-none ${btnWidth} text-base px-6 rounded-[4px] disabled:bg-gray-600`}
      >
        {btnText}
      </button>
    </form>
  );
};

export default ReusableForm;
