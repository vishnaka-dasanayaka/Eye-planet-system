import CloseIcon from "@mui/icons-material/Close";

function DeleteConfirmation(props) {
  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const handleConfirmDelete = (e) => {
    props.onDelete(e);
    onCloseclick();
  };

  return props.addTrigger ? (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-75">
      <div className="relative w-11/12 bg-white p-3 md:w-[400px] flex rounded-lg flex-col items-center justify-start">
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-gray-600">
          Confirm Deletion
        </h1>

        <p className="font-semibold text-gray-500">
          Are you sure to proceed with delete ? This action can be undone!
        </p>

        <div className="flex items-center justify-end w-full gap-5">
          <button onClick={onCloseclick} className="btn">
            cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="capitalize btn_delete"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeleteConfirmation;
