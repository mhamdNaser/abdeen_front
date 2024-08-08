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
import Searchmenu from "./Searchmenu";
import { useCompanyInfo } from "../../provider/CompanyInfoProvider";

export default function MainHeader({ background, likeNum, cardProductNum, menuItems }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [singupModalOpen, setSingupModalOpen] = useState(false);
  const { companyInfo, loading } = useCompanyInfo();
  const [liistmenu, setListMenu] = useState(false);
  const { token } = useStateContext({});
  const { translations, language } = useTranslation();

  window.onscroll = function () {
    var navbar = document.getElementById("navbar");

    if (window.scrollY > 0) {
      navbar.classList.remove("shadow-none");
      navbar.classList.add("shadow-sm");
      navbar.classList.add("shadow-redColor");
    } else {
      navbar.classList.remove("shadow-sm");
      navbar.classList.remove("shadow-redColor");
      navbar.classList.add("xl:text-white");
      navbar.classList.add(" text-dark");
    }
  };

  const showlistMenu = () => {
    setListMenu(!liistmenu);
  };

  return (
    <div
      id="navbar"
      className={`w-full flex flex-col justify-between text-white bg-[#3e3e3e] text-xl font-bold z-30 shadow-none h-auto py-4  px-4 sm:px-6 sticky top-0 `}
    >
      <div className="container m-auto">
        <div className="flex flex-row w-full items-center py-3 justify-between">
          <Link
            to={"/"}
            className="relative flex items-center justify-between "
          >
            <img
              src={companyInfo.logo}
              alt="Logo"
              className="max-w-[210px] min-w-[140px]"
            />
          </Link>
          <div className="w-1/3">
            <Searchmenu />
          </div>
          <div className="relative flex xl:hidden items-center gap-4 justify-end p-4">
            <button onClick={showlistMenu} className="xl:hidden flex">
              <BiMenu size={32} />
            </button>
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
          {liistmenu && <ListMenu col={"flex-col"} menuItems={items} />}

          <div className="relative hidden xl:flex items-center justify-between md:gap-2 lg:gap-6 xl:gap-8">
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
        <div className="w-full xl:block hidden pt-3">
          <ListMenu menuItems={menuItems} />
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
