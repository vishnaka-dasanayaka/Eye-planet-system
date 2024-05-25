import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FaceIcon from "@mui/icons-material/Face";
import ChangePic from "../components/popups/profile_popups/ChangePic";

function Profile(props) {
  const [addPicturePopup, setAddPicturePopup] = useState(false);
  return (
    <div className="flex items-start justify-start h-screen">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />

        <div className="flex flex-col items-start justify-start w-full md:mt-5 mt-28 md:flex-row">
          <div className="flex flex-col items-center justify-center w-full m-2 bg-white md:w-1/3">
            <div className="flex items-center justify-center w-40 h-40 mt-10 mb-5 border-2 rounded-full ">
              <img
                src="../assets/imgs/user.jpg"
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
              sachin vishnaka
            </h1>

            <h1 className="text-sm font-thin tracking-wide capitalize ">
              72/D, Alapalawala, Handesa
            </h1>

            <h1 className="text-sm font-thin tracking-wide ">
              vishnakadasanayaka@gmail.com
            </h1>

            <h1 className="mb-5 text-sm font-thin tracking-wide capitalize">
              071 3704691
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
                  value={"vishnaka"}
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
                  value={"dasanayaka"}
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
                  value={"72/D, Alapalawala, handeessa"}
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
                  value={"vishnakadasanayaka@gmail.com"}
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
                  value={"0713704691"}
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
                  value={"0713704691"}
                  type="password"
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
                />
              </div>
            </div>

            <div className="m-3 btn">
              <button className="capitalize">change password </button>
            </div>
          </div>
        </div>
      </div>

      <ChangePic
        addTrigger={addPicturePopup}
        setAddTrigger={setAddPicturePopup}
      ></ChangePic>
    </div>
  );
}

export default Profile;
