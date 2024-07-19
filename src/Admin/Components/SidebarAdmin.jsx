import { useEffect, useState } from "react";
import {
  BiSolidMessageDetail,
  BiSolidMessageRoundedDetail,
  BiSolidArrowFromRight,
  BiSolidCategory,
  BiSolidUser,
  BiSolidHome,
  BiSolidDirections,
  BiSolidChevronDown,
  BiSolidChevronUp,
  BiSolidBriefcaseAlt2,
  BiSolidDollarCircle,
  BiSolidCreditCard,
  BiSolidServer,
  BiSolidMap,
  BiSolidTachometer,
  BiSolidEnvelope,
  BiSolidBellRing,
  BiSolidGift,
  BiSolidTruck,
  BiSolidLayout,
  BiSolidCog,
  BiSolidCreditCardFront,
  BiSolidObjectsHorizontalCenter,
  BiSolidStoreAlt,
} from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import useCheckPermission from "../../hooks/checkPermissions";
import { RiCoupon3Fill, RiPagesFill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaPager } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { useTWThemeContext } from "../../provider/ThemeProvider";
import { useStateContext } from "../../provider/ContextsProvider";
import { useTranslation } from "../../provider/TranslationProvider";

const iconMap = {
  Dashboard: <BiSolidHome />,
  "Admins Manage": <BiSolidUser />,
  "Accounts Manage": <MdManageAccounts />,
  "Products Manage": <BiSolidStoreAlt />,
  "Orders Manage": <BiSolidCategory />,
  "Locations Manage": <BiSolidMap />,
  Notifications: <BiSolidBellRing />,
  "Other Page Settings": <BiSolidLayout />,
  "General Settings": <BiSolidCog />,
  Languages: <BiSolidDirections />,
  "Back To Site": <BiSolidArrowFromRight />,
  "Pages Settings": <RiPagesFill />,
};

export default function SidebarAdmin({ setSidebarOpen }) {
  const { translations } = useTranslation();
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [listName, setListName] = useState(null);
  const [sideList, setSideList] = useState({});
  const nav = useNavigate();

  const { hasPermissionFun } = useCheckPermission();

  const getdropdownopen = (name) => {
    if (DropdownOpen === false) {
      setDropdownOpen(true);
      setListName(name);
    } else {
      if (listName === name) {
        setDropdownOpen(false);
      } else {
        setListName(name);
      }
    }
  };

  useEffect(() => {
    getSideBar();
  }, []);

  const getSideBar = () => {
    fetch("/json/adminList.json")
      .then((response) => response.json())
      .then((data) => {
        setSideList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const { theme } = useTWThemeContext();
  const handleCloseSideBar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <div className="px-3 py-[10px] sticky top-0 bg-blocks-color z-30 border-b flex items-center justify-between">
        {theme === "light" ? (
          <img
            onClick={() => nav("/")}
            src="/image/logo.png"
            className="h-[55px] m-auto w-2/3 px-8"
            alt="Logo self-center"
          />
        ) : (
          <img
            onClick={() => nav("/")}
            src="/image/logo-dark.png"
            className="h-[55px] m-auto w-2/3 px-8"
            alt="Logo"
          />
        )}
        <span className="md:hidden cursor-pointer" onClick={handleCloseSideBar}>
          <AiOutlineClose size={27} />
        </span>
      </div>

      {Object.entries(sideList).map(([title, sublist]) => {
        const isShowen =
          sublist?.perId === undefined
            ? Object.entries(sublist).some(([k, val]) => {
                return hasPermissionFun(val?.perId) ? true : false;
              })
            : hasPermissionFun(sublist?.perId);
        return isShowen ? (
          <div key={title}>
            {sublist && typeof sublist === "object" && sublist.name === null ? (
              <Link
                className="flex flex-row w-full items-center hover:bg-hard-gray-color hover:bg-background-color transition-all duration-400 ease-in-out"
                to={`${sublist.path}`}
              >
                {Object.entries(iconMap).map(([index, value]) =>
                  index === title ? (
                    <strong className="m-3" key={index}>
                      {value}
                    </strong>
                  ) : null
                )}
                <strong className="m-1 text-primary-text">
                  {title in translations ? translations[title] : title}
                </strong>
              </Link>
            ) : (
              <div>
                <button
                  className="flex flex-row w-full items-center hover:bg-background-color transition-all duration-400 ease-in-out"
                  title="User Tools"
                  onClick={() => getdropdownopen(title)}
                >
                  <div className="flex grow items-center">
                    {Object.entries(iconMap).map(([index, value]) =>
                      index === title ? (
                        <strong className="m-3" key={index}>
                          {value}
                        </strong>
                      ) : null
                    )}
                    <strong
                      className={
                        listName === title ? "ms-1 text-danger" : "ms-1"
                      }
                    >
                      {title in translations ? translations[title] : title}
                    </strong>
                  </div>
                  <div className="me-3">
                    {DropdownOpen === true && listName === title ? (
                      <BiSolidChevronUp />
                    ) : (
                      <BiSolidChevronDown />
                    )}
                  </div>
                </button>
                <div
                  className={
                    DropdownOpen === true && listName === title
                      ? "flex flex-col"
                      : "hidden"
                  }
                >
                  {sublist &&
                    Object.entries(sublist).map(([k, val]) => {
                      return (
                        <Link
                          key={k}
                          className="py-[10px] px-[43px] hover:bg-background-color active:bg-background-color focus:bg-background-color transition-all duration-400 ease-in-out"
                          to={`${val.path}`}
                        >
                          {k in translations ? translations[k] : k}
                        </Link>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        );
      })}
    </>
  );
}
