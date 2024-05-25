import CloseIcon from "@mui/icons-material/Close";

function AddUser(props) {
  const onCloseclick = () => {
    props.setAddTrigger(false);
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
          type="text"
          placeholder="First Name"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="Contact Number"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="First Name"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="email"
          placeholder="E-mail Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="password"
          placeholder="Create a Password"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <button className="text-lg capitalize btn_green">create account</button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddUser;
