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

const Sidebar = () => {
  const [sideMenu, setSideMenu] = useState(false);

  const onHandleClick = () => {
    setSideMenu(!sideMenu);
  };

  return (
    <>
      {/* Menu button for small screens */}
      <div className="fixed top-10 z-10 left-5 lg:hidden">
        {!sideMenu && (
          <MenuIcon
            onClick={onHandleClick}
            fontSize="large"
            className="text-shop_color cursor-pointer"
          />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed  z-10 bg-white lg:bg-transparent lg:block ${
          sideMenu ? "block" : "hidden"
        } lg:w-80 w-80 h-screen`}
      >
        <div className="px-2 py-3 lg:w-72 w-full h-screen">
          {/* Close button for small screens */}
          <div className="lg:hidden">
            <CloseIcon
              onClick={onHandleClick}
              fontSize="large"
              className="text-shop_color mt-8 ml-5 cursor-pointer "
            />
          </div>

          {/* Logo */}
          <div className="hidden lg:flex bg-white rounded-2xl py-8 justify-center items-center w-full">
            <StoreIcon fontSize="large" className="text-shop_color" />
            <h1 className="uppercase tracking-wide font-extrabold text-2xl ml-3 text-shop_color">
              eye planet
            </h1>
          </div>

          {/* Menu items */}
          <div className="flex mt-10 ml-5 flex-col justify-center items-start">
            <div className="flex w-full active active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center">
              <HomeIcon className="text-gray-400" />
              <h2 className="text-xl capitalize ml-5 text-gray-500 font-bold">
                dashboard
              </h2>
            </div>

            <div className="flex w-full active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center">
              <PersonAddIcon className="text-gray-400" />
              <h2 className="text-xl capitalize ml-5 text-gray-500 font-bold">
                add patients
              </h2>
            </div>

            <div className="flex w-full active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center">
              <PersonSearchIcon className="text-gray-400" />
              <h2 className="text-xl capitalize ml-5 text-gray-500 font-bold">
                find patients
              </h2>
            </div>

            <div className="flex w-full active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center">
              <PersonIcon className="text-gray-400" />
              <h2 className="text-xl capitalize ml-5 text-gray-500 font-bold">
                profile
              </h2>
            </div>

            <div className="flex w-full active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center">
              <ManageAccountsIcon className="text-gray-400" />
              <h2 className="text-xl capitalize ml-5 text-gray-500 font-bold">
                manage users
              </h2>
            </div>

            <div className="flex w-full active:bg-gray-200 hover:border-gray-400 border-2 p-1 hover:cursor-pointer border-transparent rounded-lg my-5 justify-start items-center">
              <ConnectWithoutContactIcon className="text-gray-400" />
              <h2 className="text-xl capitalize ml-5 text-gray-500 font-bold">
                contacts
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
