import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthToken } from "../../../apis/useAuthToken";
import { addBranch } from "../../../apis/branchAPIs";
import { useDispatch } from "react-redux";
import { setBranchesViaRedux } from "../../../features/branch/branchSlice";

function AddBranch(props) {
  const token = useAuthToken();
  const dispatch = useDispatch();

  const [img, setImg] = useState("");

  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const [formData, setFormData] = useState({
    branchName: "",
    branchCoordinator: "",
    address: "",
    email: "",
    contactNumber: "",
    contactNumber2: "",
  });

  const {
    branchName,
    branchCoordinator,
    address,
    email,
    contactNumber,
    contactNumber2,
  } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.branchName ||
      !formData.branchCoordinator ||
      !formData.address ||
      !formData.contactNumber ||
      !img
    ) {
      toast.error("Some required fields are empty !");
    } else {
      try {
        const form = new FormData();
        form.append("branch_pic", img);
        form.append("branchData", JSON.stringify(formData));

        // await addBranch(token, form);
        dispatch(setBranchesViaRedux(form));

        props.setAddTrigger(false);
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setImg(file);
  };
  return props.addTrigger ? (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-75">
      <div
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        className="relative w-11/12 bg-white p-3 md:w-[500px] flex flex-col items-center justify-start"
      >
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-green-700 ">
          Add a Branch
        </h1>

        <input
          type="text"
          name="branchName"
          value={branchName}
          onChange={handleChange}
          placeholder="Branch Name"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="branchCoordinator"
          value={branchCoordinator}
          onChange={handleChange}
          placeholder="Branch Coordinator"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="contactNumber"
          value={contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="contactNumber2"
          value={contactNumber2}
          onChange={handleChange}
          placeholder="Another Contact Number"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-5/6 py-2 pl-2 "
          />
        </div>

        {img && (
          <img
            className="w-2/3 mt-5 h-fit"
            src={URL.createObjectURL(img)}
            alt=""
          />
        )}

        <button
          className="mt-5 text-lg capitalize btn_green"
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddBranch;
