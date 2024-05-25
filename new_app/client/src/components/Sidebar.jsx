import React, { useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const location = useLocation();

  const isAcive = (path) => location.pathname === path;

  const onHandleClick = () => {
    setSideMenu(!sideMenu);
  };

  return (
    <>
      {/* Menu button for small screens */}
      <div className="fixed z-10 top-10 left-5 lg:hidden">
        {!sideMenu && (
          <MenuIcon
            onClick={onHandleClick}
            fontSize="large"
            className="cursor-pointer text-shop_color"
          />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed  z-10 bg-white lg:bg-transparent lg:block ${
          sideMenu ? "block" : "hidden"
        } lg:w-80  w-80 h-screen`}
      >
        <div className="w-full h-screen px-2 py-3 lg:w-72">
          {/* Close button for small screens */}
          <div className="lg:hidden">
            <CloseIcon
              onClick={onHandleClick}
              fontSize="large"
              className="mt-8 ml-5 cursor-pointer text-shop_color "
            />
          </div>

          {/* Logo */}
          <Link to={"/"}>
            <div className="items-center justify-center hidden w-full py-8 bg-white cursor-pointer lg:flex rounded-2xl">
              <StoreIcon fontSize="large" className="text-shop_color" />
              {/* <div className="w-10 ">
                <img
                  src="../assets/imgs/logo.png"
                  className="w-full h-full"
                  alt=""
                />
              </div> */}
              <h1 className="ml-3 text-2xl font-extrabold tracking-wide uppercase text-shop_color">
                eye planet
              </h1>
            </div>
          </Link>

          {/* Menu items */}
          <div className="flex flex-col items-start justify-center mt-10 ml-5">
            <Link to={"/"}>
              <div
                className={`flex w-64 ${
                  isAcive("/") ? "active" : ""
                } active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center`}
              >
                <HomeIcon className="text-gray-400" />
                <h2 className="ml-5 text-xl font-bold text-gray-500 capitalize">
                  dashboard
                </h2>
              </div>
            </Link>

            <Link to={"/add"}>
              <div
                className={`flex w-64 ${
                  isAcive("/add") ? "active" : ""
                } active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center`}
              >
                <PersonAddIcon className="text-gray-400" />
                <h2 className="ml-5 text-xl font-bold text-gray-500 capitalize">
                  add patients
                </h2>
              </div>
            </Link>

            <Link to={"/find"}>
              <div
                className={`${
                  isAcive("/find") ? "active" : ""
                } flex w-64 active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center`}
              >
                <PersonSearchIcon className="text-gray-400" />
                <h2 className="ml-5 text-xl font-bold text-gray-500 capitalize">
                  find patients
                </h2>
              </div>
            </Link>

            <Link to={"/me"}>
              <div
                className={`${
                  isAcive("/me") ? "active" : ""
                } flex w-64 active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center`}
              >
                <PersonIcon className="text-gray-400" />
                <h2 className="ml-5 text-xl font-bold text-gray-500 capitalize">
                  profile
                </h2>
              </div>
            </Link>

            <Link to={"/contacts"}>
              <div
                className={`${
                  isAcive("/contacts") ? "active" : ""
                } flex w-64 active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center`}
              >
                <ConnectWithoutContactIcon className="text-gray-400" />
                <h2 className="ml-5 text-xl font-bold text-gray-500 capitalize">
                  contacts
                </h2>
              </div>
            </Link>

            <Link to={"/admin"}>
              <div
                className={`${
                  isAcive("/admin") ? "active" : ""
                } flex w-64 active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center`}
              >
                <ManageAccountsIcon className="text-gray-400" />
                <h2 className="ml-5 text-xl font-bold text-gray-500 capitalize">
                  admin panel
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
