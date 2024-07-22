import React, { useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { useTranslation } from "../../provider/TranslationProvider";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../provider/ContextsProvider";

export default function UserMenu() {
  const nav = useNavigate();
  const { token, setToken } = useStateContext({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")));
  const [showmenu, setShowmenu] = useState(false);
  const { translations, language } = useTranslation();

  const getshowmenu = () => {
    setShowmenu(!showmenu);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("LANGUAGE");
    localStorage.removeItem("mode");
    nav("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showmenu &&
        !document.querySelector(".menu-dropdown").contains(event.target)
      ) {
        setShowmenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showmenu]);

  return (
    <>
      <button onClick={getshowmenu}>
        {token && user?.image ? (
          <img
            className="h-8 w-8 rounded-full"
            src={import.meta.env.VITE_WEBSITE_URL + user.image}
          ></img>
        ) : (
          <BiSolidUserCircle size={32} />
        )}
      </button>
      <div
        className={`absolute flex flex-col xl:mt-[40px] mt-[240px] min-w-[120px] overflow-y-auto end-0 component-shadow bg-blocks-color rounded-md ${
          showmenu ? "h-[auto]" : "h-0"
        }`}
      >
        {token && (
          <div className={`font-bold text-md border-b px-6 py-3 text-gray-600 hover:bg-background-color transition-all duration-400 ease-in-out`}>
            {user.username}
          </div>
        )}
        <Link
          to={`/profile/${user.id}/${user.username}`}
          className="font-bold px-6 py-2 text-gray-600 hover:bg-background-color transition-all duration-400 ease-in-out"
        >
          {translations?.Edit_Profile || "Edit Profile"}
        </Link>
        {/* <Link className="font-bold px-6 text-gray-600 py-2 hover:bg-background-color transition-all duration-400 ease-in-out">
          {translations?.Password_Change || "Password Change"}
        </Link> */}
        <Link
          onClick={handleLogout}
          className="font-bold px-6 py-2 text-gray-600 hover:bg-background-color transition-all duration-400 ease-in-out"
        >
          {translations?.Logout || "Logout"}
        </Link>
      </div>
    </>
  );
}
