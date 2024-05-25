import CloseIcon from "@mui/icons-material/Close";

function AddBranch(props) {
  const onCloseclick = () => {
    props.setAddTrigger(false);
  };
  return props.addTrigger ? (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-75">
      <div className="relative w-11/12 bg-white p-3 md:w-[500px] flex flex-col items-center justify-start">
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-green-700 ">
          Add a Branch
        </h1>

        <input
          type="text"
          placeholder="Branch Name"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="Branch Coordinator"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="Email Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="Contact Number"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          placeholder="Another Contact Number"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input type="file" className="w-5/6 py-2 pl-2 mb-5 " />

        <button className="text-lg capitalize btn_green">submit</button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddBranch;
