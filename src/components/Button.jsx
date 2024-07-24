import { Link } from "react-router-dom";
const Button = ({
  isLink,
  goto,
  Icon,
  title,
  width,
  color,
  onClickFun,
  hoverStyles,
  linkState,
  iconColor,
  textColor,
}) => {
  return isLink ? (
    <Link
      to={goto}
      state={linkState}
      className={`flex justify-between ${Icon && title ? "gap-1" : ""} ${
        width && `w-[${width}]`
      } items-center cursor-pointer px-3 py-2 ${color}  ${hoverStyles} transition-all text-center rounded-[4px]`}
    >
      <span className={`text-primary-text text-${textColor}`}>{title}</span>{" "}
      {Icon && <span>{Icon}</span>}
    </Link>
  ) : (
    <div
      onClick={onClickFun}
      className={`flex justify-between ${Icon && title ? "gap-1" : ""} ${
        width && `w-[${width}]`
      } items-center cursor-pointer px-3 py-2 ${color} ${hoverStyles} transition-all text-center rounded-[4px]`}
    >
      <span className={`text-primary-text text-${textColor}`}>{title}</span>{" "}
      {Icon && <span className={`text-${iconColor}`}>{Icon}</span>}
    </div>
  );
};

export default Button;
