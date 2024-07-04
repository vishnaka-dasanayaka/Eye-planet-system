import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChangePic from "../components/popups/profile_popups/ChangePic";
import { useAuthToken } from "../apis/useAuthToken";
import { getUser, updatePassword } from "../apis/userAPI";
import Loading from "../components/spinners/Loading";
import { toast } from "sonner";
import { url } from "../config/config";

function Profile(props) {
  const [addPicturePopup, setAddPicturePopup] = useState(false);
  const [user, setUser] = useState([]);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { currentPassword, newPassword, confirmNewPassword } = passwords;

  const token = useAuthToken();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const response = await getUser(token);
        setUser(response);
      }
    };

    fetchUser();
  }, [token]);

  const onClickPasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and Confirm Password should be matched");
    } else {
      try {
        await updatePassword(token, passwords);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChange = (e) => {
    setPasswords((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-start justify-start h-screen">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />

        {user.data ? (
          <div className="flex flex-col items-start justify-start w-full md:mt-5 mt-28 md:flex-row">
            <div className="flex flex-col items-center justify-center w-full m-2 bg-white md:w-1/3">
              <div className="flex items-center justify-center w-40 h-40 mt-10 mb-5 border-2 rounded-full ">
                <img
                  src={
                    user.data.pic === ""
                      ? `../assets/imgs/dummyUser.png`
                      : `${user.data.pic}`
                  }
                  className="object-cover w-full h-full rounded-full"
                  alt=""
                />{" "}
              </div>

              <div>
                <button
                  onClick={() => setAddPicturePopup(true)}
                  className="mb-10 capitalize btn_green"
                >
                  change profile picture
                </button>
              </div>
              <h1 className="text-xl font-extrabold tracking-wide capitalize ">
                {user.data.firstName} {user.data.lastName}
              </h1>

              <h1 className="text-sm font-thin tracking-wide capitalize ">
                {user.data.address}
              </h1>

              <h1 className="text-sm font-thin tracking-wide ">
                {user.data.email}
              </h1>

              <h1 className="mb-5 text-sm font-thin tracking-wide capitalize">
                {user.data.contactNumber}
              </h1>
            </div>

            <div className="flex flex-col items-start justify-start w-full m-2 bg-white md:w-2/3">
              <div className="flex items-center justify-center w-full border-b-2">
                <div className="flex items-center justify-start w-1/3 h-10 pl-3 m-1 ">
                  <label
                    className="font-semibold tracking-wide capitalize"
                    htmlFor=""
                  >
                    first name
                  </label>
                </div>
                <div className="flex items-center justify-start w-2/3 h-10 m-1 b">
                  <input
                    className="w-full p-1 capitalize bg-gray-100 outline-none"
                    value={user.data.firstName}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full border-b-2">
                <div className="flex items-center justify-start w-1/3 h-10 pl-3 m-1 ">
                  <label
                    className="font-semibold tracking-wide capitalize"
                    htmlFor=""
                  >
                    last name
                  </label>
                </div>
                <div className="flex items-center justify-start w-2/3 h-10 m-1 b">
                  <input
                    className="w-full p-1 capitalize bg-gray-100 outline-none"
                    value={user.data.lastName}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full border-b-2">
                <div className="flex items-center justify-start w-1/3 h-10 pl-3 m-1 ">
                  <label
                    className="font-semibold tracking-wide capitalize"
                    htmlFor=""
                  >
                    permenant address
                  </label>
                </div>
                <div className="flex items-center justify-start w-2/3 h-10 m-1 b">
                  <input
                    className="w-full p-1 capitalize bg-gray-100 outline-none"
                    value={user.data.address}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full border-b-2">
                <div className="flex items-center justify-start w-1/3 h-10 pl-3 m-1 ">
                  <label
                    className="font-semibold tracking-wide capitalize"
                    htmlFor=""
                  >
                    emal address
                  </label>
                </div>
                <div className="flex items-center justify-start w-2/3 h-10 m-1 b">
                  <input
                    className="w-full p-1 bg-gray-100 outline-none"
                    value={user.data.email}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full border-b-2">
                <div className="flex items-center justify-start w-1/3 h-10 pl-3 m-1 ">
                  <label
                    className="font-semibold tracking-wide capitalize"
                    htmlFor=""
                  >
                    contact number
                  </label>
                </div>
                <div className="flex items-center justify-start w-2/3 h-10 m-1 b">
                  <input
                    className="w-full p-1 capitalize bg-gray-100 outline-none "
                    value={user.data.contactNumber}
                    type="text"
                  />
                </div>
              </div>

              <div className="m-3 btn">
                <button className="capitalize">save details</button>
              </div>

              <div className="flex items-center justify-center w-full border-b-2">
                <div className="flex items-center justify-start w-1/3 h-10 pl-3 m-1 ">
                  <label
                    className="font-semibold tracking-wide capitalize"
                    htmlFor=""
                  >
                    current password
                  </label>
                </div>
                <div className="flex items-center justify-start w-2/3 h-10 m-1 b">
                  <input
                    className="w-full p-1 capitalize bg-gray-100 outline-none"
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full border-b-2">
                <div className="flex items-center justify-start w-1/3 h-10 pl-3 m-1 ">
                  <label
                    className="font-semibold tracking-wide capitalize"
                    htmlFor=""
                  >
                    new password
                  </label>
                </div>
                <div className="flex items-center justify-start w-2/3 h-10 m-1 b">
                  <input
                    className="w-full p-1 capitalize bg-gray-100 outline-none "
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full border-b-2">
                <div className="flex items-center justify-start w-1/3 h-10 pl-3 m-1 ">
                  <label
                    className="font-semibold tracking-wide capitalize"
                    htmlFor=""
                  >
                    confirm new password
                  </label>
                </div>
                <div className="flex items-center justify-start w-2/3 h-10 m-1 b">
                  <input
                    className="w-full p-1 capitalize bg-gray-100 outline-none"
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div
                className={`m-3 btn ${
                  newPassword && currentPassword && confirmNewPassword
                    ? "block"
                    : "hidden"
                }`}
              >
                <button className="capitalize" onClick={onClickPasswordChange}>
                  change password
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>

      <ChangePic
        addTrigger={addPicturePopup}
        setAddTrigger={setAddPicturePopup}
        user={user.data}
      ></ChangePic>
    </div>
  );
}

export default Profile;
