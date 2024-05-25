import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";

function Login() {
  return (
    <div className="login_body">
      <div class="   w-screen h-screen flex justify-center items-center backdrop-blur-sm   backdrop-brightness-50">
        <div className="h-fit sm:w-[550px] w-full flex flex-col justify-center items-center  bg-white opacity-85 rounded-lg p-5">
          <h1 className="font-extrabold text-3xl capitalize">login</h1>
          <div className="flex rounded-md w-full border-2 my-3 mt-5 justify-between items-center p-3">
            <input
              placeholder="Username"
              className="p-1  w-full mr-2  outline-none"
              type="text"
            />
            <PersonIcon />
          </div>

          <div className="flex rounded-md w-full border-2 my-3  justify-between items-center p-3">
            <input
              placeholder="Password"
              className="p-1  w-full mr-2  outline-none"
              type="password"
            />
            <PasswordIcon />
          </div>

          <button className="btn w-full">login</button>

          <h3 className="font-semibold mt-2 text-sm">
            Forget password ?
            <span className="underline ml-1 cursor-pointer hover:text-blue-500">
              change password
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
