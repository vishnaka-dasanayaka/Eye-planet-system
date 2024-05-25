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
      <div className="fixed flex items-center justify-between w-full px-5 pt-10 pb-5 bg-white md:relative md:bg-transparent lg:justify-end">
        <Link to={"/"}>
          <div className="flex items-center justify-center ml-24 lg:hidden rounded-2xl">
            <StoreIcon fontSize="large" className="text-shop_color" />
            <h1 className="ml-3 text-2xl font-extrabold tracking-wide uppercase text-shop_color">
              eye planet
            </h1>
          </div>
        </Link>
        <FaceIcon
          onClick={onHandleClick}
          className="cursor-pointer hover:scale-110"
          fontSize="large"
          ref={iconRef}
        />
      </div>

      {menu && (
        <div
          ref={menuRef}
          className="fixed w-40 p-1 bg-white rounded-md right-6 top-20"
        >
          <h2 className="p-1 capitalize">sachin vishnaka</h2>
          <Link to={"/me"}>
            <h2 className="p-1 text-gray-500 border-b-2 cursor-pointer hover:bg-gray-200">
              Profile
            </h2>
          </Link>
          <h2 className="p-1 text-gray-500 cursor-pointer hover:bg-gray-200">
            Log out
          </h2>
        </div>
      )}
    </div>
  );
}

export default Header;
