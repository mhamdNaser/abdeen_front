import { Link } from "react-router-dom";
import "./style/Button.css";

function Button({ isLink, goto, width, title, className, action }) {
  try {
    return (
      <>
        <Link to={isLink ? goto : ""} onClick={isLink ? null : action} className={` flex justify-between gap-1 ${width && `w-[${width}]`} items-center cursor-pointer px-3 py-2 rounded-[4px] text-white form-button ${className ? className : ""}`}>
          <span>{title}</span>
        </Link>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Button;
