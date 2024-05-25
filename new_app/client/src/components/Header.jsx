import React, { useState, useRef, useEffect } from "react";
import FaceIcon from "@mui/icons-material/Face";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";

function Header() {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const onHandleClick = () => {
    setMenu(!menu);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target)
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="fixed md:relative  md:bg-transparent bg-white  flex w-full   items-center justify-between lg:justify-end px-5 pb-5 pt-10">
        <div className="lg:hidden ml-24  flex  rounded-2xl  justify-center items-center">
          <StoreIcon fontSize="large" className="text-shop_color" />
          <h1 className="uppercase tracking-wide font-extrabold text-2xl ml-3 text-shop_color">
            eye planet
          </h1>
        </div>
        <FaceIcon
          onClick={onHandleClick}
          className="hover:scale-110 cursor-pointer"
          fontSize="large"
          ref={iconRef}
        />
      </div>

      {menu && (
        <div
          ref={menuRef}
          className="fixed right-6 top-20 bg-white p-1 w-40 rounded-md"
        >
          <h2 className="capitalize p-1">sachin vishnaka</h2>
          <Link to={"/me"}>
            <h2 className="cursor-pointer border-b-2 p-1 hover:bg-gray-200 text-gray-500">
              Profile
            </h2>
          </Link>
          <h2 className="p-1 cursor-pointer text-gray-500 hover:bg-gray-200">
            Log out
          </h2>
        </div>
      )}
    </div>
  );
}

export default Header;
