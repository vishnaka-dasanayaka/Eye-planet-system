import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import StoreIcon from "@mui/icons-material/Store";

function Header() {
  return (
    <div className="md:relative fixed md:bg-transparent bg-white  flex w-full   items-center justify-between lg:justify-end px-5 pb-5 pt-10">
      <div className="lg:hidden ml-24  flex  rounded-2xl  justify-center items-center">
        <StoreIcon fontSize="large" className="text-shop_color" />
        <h1 className="uppercase tracking-wide font-extrabold text-2xl ml-3 text-shop_color">
          eye planet
        </h1>
      </div>
      <FaceIcon className="hover:scale-105 cursor-pointer" fontSize="large" />
    </div>
  );
}

export default Header;
