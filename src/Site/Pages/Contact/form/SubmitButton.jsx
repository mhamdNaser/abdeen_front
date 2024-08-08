import "./style/SubmitButton.css";

function SubmitButton({ width, text, classes, notSubmit, onClick, disabled }) {
  try {
    return (
      <>
        <input
          type={notSubmit ? "button" : "submit"}
          onClick={onClick ? onClick : null}
          value={text ? text : "Submit"}
          disabled={disabled}
          className={` bg-[#dc3546] disabled:cursor-not-allowed flex justify-between gap-1 ${`w-[${
            width ? width : "max-content"
          }]`} items-center cursor-pointer text-2xl px-12 py-3 rounded-[4px] text-white submit-button ${
            classes ? classes : ""
          }`}
        />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SubmitButton;
