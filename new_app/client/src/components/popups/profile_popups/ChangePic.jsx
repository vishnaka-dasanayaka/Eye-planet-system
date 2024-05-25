import CloseIcon from "@mui/icons-material/Close";

function ChangePic(props) {
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
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-green-700 capitalize ">
          change profile picture
        </h1>

        <div className="w-5/6 h-80">
          <img
            src="../assets/imgs/user.jpg"
            className="object-cover w-full h-full"
            alt=""
          />
        </div>

        <input type="file" className="my-5" />
        <button className="mb-5 capitalize btn_green">change photo</button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ChangePic;
