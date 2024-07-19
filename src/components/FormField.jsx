import React from "react";
import CustomSelect from "./CustomSelect";

const FormField = ({
  field,
  register,
  errors,
  handleFileChange,
  selectedOptions,
  setSelectedOptions,
  image,
  onSelectChange,
  defaultvalue,
}) => {
  const {
    title,
    type,
    name,
    validationProps,
    readOnly,
    disabled,
    optionValue,
    searchKey,
    optionText,
    styles,
    acceptTypes,
    checkboxStyle,
    placeHolder,
    connectionWith,
  } = field;

  switch (type) {
    case "text":
      return (
        <div className={`input-field w-full ${styles}`}>
          <label
            htmlFor={name}
            className="input-label"
            dangerouslySetInnerHTML={{ __html: title }}
          ></label>
          <input
            className="input-box bg-blocks-color"
            type="text"
            name={name}
            id={name}
            placeholder={placeHolder}
            readOnly={readOnly}
            disabled={disabled}
            {...register(name, validationProps)}
          />
          {errors && errors[name] && (
            <span className="red-text">{errors[name]["message"]}</span>
          )}
        </div>
      );
    case "number":
      return (
        <div className={`input-field w-full ${styles}`}>
          <label
            htmlFor={name}
            dangerouslySetInnerHTML={{ __html: title }}
            className="input-label"
          ></label>
          <input
            className="input-box bg-blocks-color"
            type="number"
            name={name}
            id={name}
            placeholder={placeHolder}
            readOnly={readOnly}
            disabled={disabled}
            {...register(name, validationProps)}
          />
          {errors && errors[name] && (
            <span className="red-text">{errors[name]["message"]}</span>
          )}
        </div>
      );
    case "date":
      return (
        <div className={`input-field w-full ${styles}`}>
          <label
            dangerouslySetInnerHTML={{ __html: title }}
            htmlFor={name}
            className="input-label"
          ></label>
          <input
            className="input-box bg-blocks-color"
            type="date"
            name={name}
            id={name}
            placeholder={placeHolder}
            readOnly={readOnly}
            disabled={disabled}
            {...register(name, validationProps)}
          />
          {errors && errors[name] && (
            <span className="red-text">{errors[name]["message"]}</span>
          )}
        </div>
      );
    case "password":
      return (
        <div className={`input-field w-full ${styles}`}>
          <label
            dangerouslySetInnerHTML={{ __html: title }}
            htmlFor={name}
            className="input-label"
          ></label>
          <input
            className="input-box bg-blocks-color"
            type="password"
            name={name}
            id={name}
            readOnly={readOnly}
            placeholder={placeHolder}
            disabled={disabled}
            {...register(name, validationProps)}
          />
          {errors && errors[name] && (
            <span className="red-text">{errors[name]["message"]}</span>
          )}
        </div>
      );
    case "email":
      return (
        <div className={`input-field w-full ${styles}`}>
          <label
            dangerouslySetInnerHTML={{ __html: title }}
            htmlFor={name}
            className="input-label"
          ></label>
          <input
            className="input-box bg-blocks-color"
            type="email"
            name={name}
            id={name}
            placeholder={placeHolder}
            readOnly={readOnly}
            disabled={disabled}
            {...register(name, validationProps)}
          />
          {errors && errors[name] && (
            <span className="red-text">{errors[name]["message"]}</span>
          )}
        </div>
      );
    case "textArea":
      return (
        <div className={`input-field w-full ${styles}`}>
          <label
            dangerouslySetInnerHTML={{ __html: title }}
            htmlFor={name}
            className="input-label"
          ></label>
          <textarea
            className="input-box bg-blocks-color"
            name={name}
            id={name}
            placeholder={placeHolder}
            readOnly={readOnly}
            disabled={disabled}
            {...register(name, validationProps)}
          />
          {errors && errors[name] && (
            <span className="red-text">{errors[name]["message"]}</span>
          )}
        </div>
      );
    case "checkbox":
      return !checkboxStyle ? (
        <div className={`form-group w-full ${styles}`}>
          <input
            type="checkbox"
            name={name}
            readOnly={readOnly}
            disabled={disabled}
            id={name}
            {...register(name, validationProps)}
          />
          <label htmlFor={name}>{title}</label>
          {errors && errors[name] && (
            <span className="red-text">{errors[name]["message"]}</span>
          )}
        </div>
      ) : (
        <div className={`${styles}`}>
          <label>
            <div className="switch">
              <input
                type="checkbox"
                name={name}
                readOnly={readOnly}
                disabled={disabled}
                hidden
                id={name}
                {...register(name, validationProps)}
              />
              <div className="slider"></div>
              <label htmlFor={name}>{title}</label>
            </div>
          </label>
        </div>
      );
    case "select":
      return (
        <CustomSelect
          key={name}
          field={field}
          register={register}
          errors={errors}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          optionValue={optionValue}
          searchKey={searchKey}
          optionText={optionText}
          onSelectChange={onSelectChange}
          defaultvalue={defaultvalue}
        />
      );
    case "custom":
      return field.customComponent({
        setError,
        setValue,
        errors,
        clearErrors,
      });
    case "file":
      return (
        <div className={`input-field w-full ${styles}`}>
          {field?.fileFor === "image" ? (
            <>
              <div className={`${field.imgStyle} relative`}>
                <img
                  src={`${import.meta.env.VITE_WEBSITE_URL + image}`}
                  alt=""
                  onError={() => console.error("Image failed to load")}
                  onClick={() => {
                    const fileInput = document.getElementById(name);
                    fileInput.click();
                  }}
                  id="imageFile"
                  className={`absolute w-full rounded-full text-center component-shadow border-mainBorder object-cover ${field.imgStyle}`}
                />
                <input
                  type="file"
                  name={name}
                  {...register(name, validationProps)}
                  accept={acceptTypes}
                  id={name}
                  onChange={handleFileChange(name)}
                  className="imageFileInput"
                />
                {!image && (
                  <span
                    className="absolute top-[50%] left-[50%] text-sm w-max"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    choose a file
                  </span>
                )}
              </div>
              {errors && errors[name] && (
                <span role="alert" className="red-text">
                  {errors[name]["message"]}
                </span>
              )}
            </>
          ) : (
            <>
              <label htmlFor={name}>{title}</label>
              <input
                type="file"
                name={name}
                multiple={false}
                accept={acceptTypes}
                className="fileInput bg-blocks-color"
                {...register(name, validationProps)}
                id={name}
              />
              {errors && errors[name] && (
                <span className="red-text">{errors[name]["message"]}</span>
              )}
            </>
          )}
        </div>
      );
    default:
      return (
        <div key={name}>
          <span className="red-text">Invalid Field</span>
        </div>
      );
  }
};

export default FormField;
