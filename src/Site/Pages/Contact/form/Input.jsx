import "./style/Input.css";

function Input({
  type,
  placeholder,
  register,
  name,
  label,
  errors,
  element,
  onChange,
  disabled,
  readonly,
  value,
}) {
  try {
    return (
      <>
        {type == "checkbox" ? (
          <div className="checkbox-input flex">
            <input type={type} id={name} {...register(name)} />
            <label htmlFor={name}>{label}</label>
            {element ? element : null}
            {errors[name] ? <span>{errors[name].message}</span> : null}
          </div>
        ) : (
          <div className="form-input">
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              readOnly={readonly}
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              id={name}
              {...register(name)}
              onChange={onChange ? onChange : null}
            />
            {errors[name] ? <span>{errors[name].message}</span> : null}
          </div>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Input;
