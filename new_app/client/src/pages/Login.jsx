import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login, reset } from "../features/auth/authSlice";
import Loading from "../components/spinners/Loading";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      navigate("/");
      toast.success("Login Successfull");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Both fileds are mandetory");
    } else {
      dispatch(login(formData));
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="login_body">
      <div class="   w-screen h-screen flex justify-center items-center backdrop-blur-sm   backdrop-brightness-50">
        <div className="h-fit sm:w-[550px] w-full flex flex-col justify-center items-center  bg-white opacity-85 rounded-lg p-5">
          <h1 className="text-3xl font-extrabold capitalize">login</h1>
          <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
            <input
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Username"
              className="w-full p-1 mr-2 outline-none"
              type="text"
            />
            <PersonIcon />
          </div>

          <div className="flex items-center justify-between w-full p-3 my-3 border-2 rounded-md">
            <input
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full p-1 mr-2 outline-none"
              type="password"
            />
            <PasswordIcon />
          </div>

          <button onClick={onSubmit} className="w-full bg-red-500">
            login
          </button>

          <h3 className="mt-2 text-sm font-semibold">
            Forget password ?
            <span className="ml-1 underline cursor-pointer hover:text-blue-500">
              change password
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
