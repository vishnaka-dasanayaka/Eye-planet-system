import React, { useState, useRef, useEffect } from "react";
import FaceIcon from "@mui/icons-material/Face";
import StoreIcon from "@mui/icons-material/Store";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "sonner";
import { url } from "../config/config";
import { getUser } from "../apis/userAPI";
import { useAuthToken } from "../apis/useAuthToken";
import Loading from "../components/spinners/Loading";
import { clearData } from "../features/branch/branchSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [me, setMe] = useState();
  const token = useAuthToken();

  const fetchPic = async () => {
    const response = await getUser(token);
    setMe(response.data);
  };

  useEffect(() => {
    fetchPic();
  }, []);

  const { user } = useSelector((state) => state.auth);
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

  const onLogoutClick = () => {
    dispatch(logout());
    dispatch(clearData());
    dispatch(reset());
    navigate("/login");
    toast.success("User Logged Out !");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!me) return <Loading />;

  return (
    <div className="">
      <div className="fixed flex items-center justify-between w-full px-5 pt-[38px] pb-5 bg-white md:relative md:bg-transparent lg:justify-end">
        <div></div>
        <Link to={"/"}>
          <div className="flex items-center justify-center lg:hidden rounded-2xl">
            <StoreIcon fontSize="large" className="text-shop_color" />
            <h1 className="ml-3 text-2xl font-semibold tracking-wide uppercase text-shop_color">
              eye planet
            </h1>
          </div>
        </Link>

        {user ? (
          // <FaceIcon
          //   onClick={onHandleClick}
          //   className="cursor-pointer hover:scale-110"
          //   fontSize="large"
          //   ref={iconRef}
          // />
          <img
            className="w-10 h-10 cursor-pointer hover:scale-110 border-black border-[1px] p-[1px] rounded-full"
            src={me.pic}
            alt="profile picture"
            onClick={onHandleClick}
            ref={iconRef}
          />
        ) : (
          <>
            <Link to={"/login"}>
              <button className="capitalize btn">login</button>
            </Link>
          </>
        )}
      </div>

      {menu && (
        <div
          ref={menuRef}
          className="fixed w-40 p-1 bg-white rounded-md right-6 top-24"
        >
          <div className="flex items-center justify-between">
            <h2 className="p-1 capitalize">{user.firstName}</h2>
            {user.role === "admin" ? (
              <h6 className="text-xs text-green-500 capitalize">{user.role}</h6>
            ) : (
              <h6 className="text-xs text-blue-500 capitalize">{user.role}</h6>
            )}
          </div>
          <Link to={"/me"}>
            <h2 className="p-1 text-gray-500 border-b-2 cursor-pointer hover:bg-gray-200">
              Profile
            </h2>
          </Link>
          <h2
            onClick={onLogoutClick}
            className="p-1 text-gray-500 cursor-pointer hover:bg-gray-200"
          >
            Log out
          </h2>
        </div>
      )}
    </div>
  );
}

export default Header;
