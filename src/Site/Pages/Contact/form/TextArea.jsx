import "./style/Input.css";

function TextArea({ height, placeholder, register, name, label, errors }) {
  try {
    return (
      <>
        <div className="form-input">
          <label htmlFor={name}>{label}</label>
          <textarea placeholder={placeholder} id={name} {...register(name)} style={{ height: height ? height : "200px" }} />
          {errors[name] ? <span>{errors[name].message}</span> : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default TextArea;
