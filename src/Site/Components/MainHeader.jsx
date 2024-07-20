import React, { useState } from "react";
import { BiSolidCart, BiMenu } from "react-icons/bi";
import { useTranslation } from "../../provider/TranslationProvider";
import UserMenu from "./UserMenu";
import ListMenu from "./ListMenu";
import { useStateContext } from "../../provider/ContextsProvider";
import GuidList from "./GuidList";
import { Link } from "react-router-dom";
import ModalContainer from "../../components/ModalContainer";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

export default function MainHeader({ background, likeNum, cardProductNum, menuItems }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [singupModalOpen, setSingupModalOpen] = useState(false);
  const [liistmenu, setListMenu] = useState(false);
  const { token } = useStateContext({});
  const { translations, language } = useTranslation();

  window.onscroll = function () {
    var navbar = document.getElementById("navbar");
    //
    if (!background) {
      navbar.classList.add("bg-white");
      navbar.classList.add("text-dark");
    } else {
      if (window.scrollY > 0) {
        navbar.classList.add("bg-white");
        navbar.classList.remove("text-white");
        navbar.classList.remove("shadow-none");
        navbar.classList.add("shadow-sm");
        navbar.classList.add("shadow-redColor");
      } else {
        navbar.classList.remove("bg-white");
        navbar.classList.remove("text-primary-text");
        navbar.classList.remove("shadow-sm");
        navbar.classList.remove("shadow-redColor");
        navbar.classList.add("text-white");
      }
    }
  };

  const showlistMenu = () => {
    setListMenu(!liistmenu);
  };

  return (
    <div
      id="navbar"
      className={`w-full flex flex-row justify-between text-xl font-bold z-0 shadow-none h-auto ${
        background
            ? "text-white"
            : "text-dark"
      } px-4 sm:px-6 sticky top-0 bg-transparent`}
    >
      <div className="flex w-full items-center justify-between">
        <Link
          to={"/"}
          className="relative flex items-center w-full sm:w-1/2 justify-between "
        >
            <img
              src="/image/logo.png"
              alt="Logo"
              className="w-1/4 max-w-[200px] min-w-[100px]"
            />
          
        </Link>
        <div className="relative flex xl:hidden items-center gap-4 w-full justify-end p-4">
          <button
            onClick={showlistMenu}
            className="xl:hidden text-[#3e3e3e] xl:text-white flex"
          >
            <BiMenu size={32} />
          </button>
          <div className="relative text-[#3e3e3e] xl:text-white">
              <Link to={"/cardPage"}>
                <BiSolidCart size={32} />
              </Link>
              <div className="absolute top-[-5px] -left-2 w-4 h-4 rounded-full bg-redColor text-white text-xs flex items-center justify-center">
                {cardProductNum > 0 ? cardProductNum : 0}
              </div>
            </div>
            {token ? (
              <UserMenu />
            ) : (
              <GuidList
                setLoginModalOpen={setLoginModalOpen}
                setSingupModalOpen={setSingupModalOpen}
              />
            )}
        </div>
        {liistmenu && <ListMenu col={"flex-col"} menuItems={menuItems} />}

        <div className="relative hidden xl:flex items-center justify-between md:gap-2 lg:gap-6 xl:gap-8">
          <div className="flex">
            <ListMenu menuItems={menuItems}/>
          </div>

          <div className="flex gap-4 px-2 sm:px-4 text-xs">
            {/* <div className="relative">
              <BiSolidHeart size={32} />
              <div className="absolute top-[-5px] -left-2 w-4 h-4 rounded-full bg-redColor text-white text-xs flex items-center justify-center">
                {likeNum > 0 ? likeNum : 0}
              </div>
            </div> */}
            <div className="relative">
              <Link to={"/cardPage"}>
                <BiSolidCart size={32} />
              </Link>
              <div className="absolute top-[-5px] -left-2 w-4 h-4 rounded-full bg-redColor text-white text-xs flex items-center justify-center">
                {cardProductNum > 0 ? cardProductNum : 0}
              </div>
            </div>
            {token ? (
              <UserMenu />
            ) : (
              <GuidList
                setLoginModalOpen={setLoginModalOpen}
                setSingupModalOpen={setSingupModalOpen}
              />
            )}
          </div>
        </div>
      </div>
      {loginModalOpen && (
        <ModalContainer
          isModalOpen={loginModalOpen}
          setIsModalOpen={setLoginModalOpen}
          component={<Login setIsAddModalOpen={setLoginModalOpen} />}
        />
      )}
      {singupModalOpen && (
        <ModalContainer
          isModalOpen={singupModalOpen}
          setIsModalOpen={setSingupModalOpen}
          component={<Register setSingupModalOpen={setSingupModalOpen} />}
        />
      )}
    </div>
  );
}
