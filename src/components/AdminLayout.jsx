import React, { useState, useEffect } from "react";
import {  Outlet, Link, useNavigate } from "react-router-dom";
import SidebarAdmin from "../Admin/Components/SidebarAdmin";
import { useStateContext } from "../provider/ContextsProvider";
import {
  BiMenuAltLeft,
  BiSolidUserCircle,
  BiSolidBrightnessHalf,
  BiSolidBrightness,
} from "react-icons/bi";
import { useTWThemeContext } from "../provider/ThemeProvider";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslation } from "../provider/TranslationProvider";
import axiosClient from "../axios-client";

export default function AdminLayout() {
  const nav = useNavigate();
  const { token, setToken } = useStateContext({});
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("USER")));
  const { translations, language } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminmenuOpen, setAdminMenuOpen] = useState(false);
  const { setTheme } = useTWThemeContext();
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode ? savedMode : "light";
  });

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    axiosClient
      .post("/admin/refresh-token", { token })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
        handleLogout();
      });
  };

  let activityTimeout;

  const resetActivityTimeout = () => {
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
      handleLogout();
    }, 1800000); // 30 دقيقة = 1800000 ميلي ثانية
  };

  const initActivityTracker = () => {
    window.addEventListener("mousemove", resetActivityTimeout);
    window.addEventListener("keydown", resetActivityTimeout);
    window.addEventListener("scroll", resetActivityTimeout);
    window.addEventListener("click", resetActivityTimeout);
  };

  useEffect(() => {
    localStorage.setItem("theme", mode);
    const htmlElement = document.querySelector("html");
    localStorage.setItem("theme", mode);
    setTheme(mode);
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", mode);
      sessionStorage.setItem("mode", mode);
    }
  }, [mode]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (language === "ar") {
        htmlElement.setAttribute("dir", "rtl");
      } else {
        htmlElement.setAttribute("dir", "ltr");
      }
    }
  }, [language]);

  useEffect(() => {
    initActivityTracker();
    resetActivityTimeout();

    const interval = setInterval(() => {
      checkTokenValidity();
    }, 3600000); 

    return () => {
      clearInterval(interval); 
      window.removeEventListener("mousemove", resetActivityTimeout);
      window.removeEventListener("keydown", resetActivityTimeout);
      window.removeEventListener("scroll", resetActivityTimeout);
      window.removeEventListener("click", resetActivityTimeout);
    };
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("LANGUAGE");
    localStorage.removeItem("mode");
    nav("/admin/login");
  };

  const handleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAdminMenu = () => {
    setAdminMenuOpen(!adminmenuOpen);
  };

  return (
    <div
      className={`flex-row md:flex bg-background-color ${
        language && language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div
        className={`flex flex-col flex-shrink-0 flex-grow-0 h-screen transition-all ease-in text-primary-text overflow-y-auto scroll bg-blocks-color z-10 shadow-lg gap-4 fixed md:sticky top-0 ${
          sidebarOpen ? "w-1/8 sm:w-1/6" : "w-0"
        }`}
      >
        <SidebarAdmin setSidebarOpen={setSidebarOpen} />
      </div>
      <div
        className={`flex flex-col w-full ${
          sidebarOpen ? "sm:w-[90%]" : "w-full"
        }`}
      >
        <div
          className={`flex flex-row items-center component-shadow w-sm-[100%] px-2 md:px-14 z-8 bg-blocks-color`}
        >
          <button className="" onClick={handleSideBar}>
            <BiMenuAltLeft
              style={{ fontSize: "30px" }}
              className="text-primary-text"
            />
          </button>
          <div className="flex flex-row-reverse items-center grow">
            <button
              className="flex flex-row items-center px-[25px] py-[24px]  justify-between "
              onClick={handleAdminMenu}
            >
              {token ? (
                admin.image !== null ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={import.meta.env.VITE_WEBSITE_URL + admin.image}
                    alt="Logo"
                  />
                ) : (
                  <BiSolidUserCircle size={32} />
                )
              ) : (
                <BiSolidUserCircle size={32} />
              )}
            </button>
            <div
              className={`absolute flex flex-col mt-[240px] w-[240px] overflow-y-auto me-[-20px] component-shadow bg-blocks-color z-10 rounded-md ${
                adminmenuOpen ? "h-[auto]" : "h-0"
              }`}
            >
              <div className="font-bold text-xl text-primary-text border-b px-6 py-3 hover:bg-background-color transition-all duration-400 ease-in-out">
                {admin.username}
                <span className="font-thin text-xs block">
                  {admin.role.name}
                </span>
              </div>
              <Link
                to={`/admin/personalProfile`}
                className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out"
              >
                {translations?.Edit_Profile || "Edit Profile"}
              </Link>
              {/* <Link className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out">
                {translations?.Password_Change || "Password Change"}
              </Link> */}
              <Link
                onClick={handleLogout}
                className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out"
              >
                {translations?.Logout || "Logout"}
              </Link>
            </div>
            <button onClick={handleMode} className="me-5">
              {mode === "light" ? (
                <BiSolidBrightness
                  style={{ fontSize: "24px" }}
                  className="text-primary-text"
                />
              ) : (
                <BiSolidBrightnessHalf
                  style={{ fontSize: "24px" }}
                  className="text-primary-text"
                />
              )}
            </button>
            <LanguageDropdown />
            <button className="me-5 relative block">
              <div className="relative">
                {/* <BiSolidBellRing
                  style={{ fontSize: "24px" }}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="text-primary-text"
                /> */}
                {/* {notifications?.data?.data?.filter((ele) => ele.status === 0).length > 0 && (
                  <span className="absolute top-[-20px]  right-[-20px] bg-greenColor rounded-full w-[25px] h-[25px] text-sm flex items-center justify-center ">
                    {notifications.data.data.filter((ele) => ele.status === 0).length}
                  </span>
                )} */}
              </div>
              {/* <div
                className={`absolute flex flex-col top-14 right-0 w-[380px]  text-primary-text overflow-y-auto me-[-20px] component-shadow bg-blocks-color z-10 rounded-md ${
                  isNotificationOpen ? "h-[320px] p-4" : "h-0 p-0"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">recent notifications</h3>
                  <Link className="text-blueColor" to={"/admin/dashboard/notifications"}>
                    show all
                  </Link>
                </div>
                <div className="my-4 flex flex-col  gap-2">
                  {notifications?.data?.data?.map((ele, i) => (
                    <span key={i} className="">
                      {ele?.title}
                    </span>
                  ))}
                </div>
              </div> */}
            </button>
          </div>
        </div>
        <div className="text-primary-text w-full min-h-[91.7vh] px-2 md:px-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
