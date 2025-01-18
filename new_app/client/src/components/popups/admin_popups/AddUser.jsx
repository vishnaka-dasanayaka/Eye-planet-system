import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { url } from "../../../config/config";

function AddUser(props) {
  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    address: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const {
    firstName,
    lastName,
    contactNumber,
    address,
    email,
    password,
    rePassword,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      toast.error("Passwords Should be equal");
      return;
    } else {
      try {
        const response = await axios.post(`${url}/api/users/adduser`, formData);
        toast.success("User Added");
        props.setAddTrigger(false);
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return props.addTrigger ? (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-75">
      <div className=" relative max-h-full overflow-y-auto w-11/12 bg-white p-3 md:w-[500px] flex flex-col items-center justify-start">
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-green-700 capitalize">
          registration form
        </h1>

        <input
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={onChange}
          type="text"
          placeholder="First Name"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={onChange}
          type="text"
          placeholder="Last Name"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          id="contactNumber"
          name="contactNumber"
          value={contactNumber}
          onChange={onChange}
          type="text"
          placeholder="Contact Number"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          id="address"
          name="address"
          value={address}
          onChange={onChange}
          type="text"
          placeholder="Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          type="email"
          placeholder="E-mail Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Create a Password"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          id="rePassword"
          name="rePassword"
          value={rePassword}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        {/* <div className="flex items-center justify-start w-5/6 mb-3 ml-3">
          <input
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            type="checkbox"
            placeholder="Confirm Password"
            className="mr-3"
          />
          <label htmlFor="" className="text-sm text-gray-500 capitalize ">
            mark <span className="lowercase">as an</span> admin
          </label>
        </div> */}

        <button onClick={onSubmit} className="text-lg capitalize btn_green">
          create user
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddUser;
