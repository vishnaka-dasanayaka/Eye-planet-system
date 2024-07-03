import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddPrescription from "../components/popups/add_patient_popups/AddPrescription";
import AddFramePopup from "../components/popups/add_patient_popups/AddFramePopup";
import { toast } from "sonner";
import { useAuthToken } from "../apis/useAuthToken";
import { addPatient } from "../apis/patientAPIs";

function AddPatient(props) {
  const [addPrescriptionPopup, setAddPrescriptionPopup] = useState(false);
  const [addFramePopup, setAddFramePopup] = useState(false);
  const [presData, setPresData] = useState(null);
  const [frameData, setFrameData] = useState(null);
  const [frameImg, setFrameImg] = useState(null);
  const [presImg, setPresImg] = useState(null);

  const handleChange = (e) => {
    setPatientData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const token = useAuthToken();

  const handleClick = async (e) => {
    e.preventDefault();
    const lenses = Array.from(
      document.querySelectorAll('input[name="lense"]:checked')
    ).map((checkbox) => checkbox.value);
    patientData.lenses = lenses;

    if (!patientData) {
      toast.error("Fill the form");
      return;
    } else {
      try {
        const form = new FormData();
        form.append("pres_img", presImg);
        form.append("frame_img", frameImg);

        form.append("patientData", JSON.stringify(patientData));
        form.append("frameData", JSON.stringify(frameData));
        form.append("presData", JSON.stringify(presData));

        await addPatient(token, form);
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const [patientData, setPatientData] = useState({
    date: "",
    branch: "",
    orderNumber: "",
    billNumber: "",
    fullName: "",
    contactNumber: "",
    dob: "",
    address: "",
    lenses: [],
    price: "",
    advance: "",
    balance: "",
    status: "",
    sentDate: "",
    receivedDate: "",
    deliveredDate: "",
    specialNote: "",
  });

  const {
    date,
    orderNumber,
    billNumber,
    fullName,
    contactNumber,
    dob,
    address,
    price,
    advance,
    balance,
    sentDate,
    receivedDate,
    deliveredDate,
    specialNote,
  } = patientData;

  const handleAddPrescription = (formData, img) => {
    setPresData(formData);
    setPresImg(img);
    setAddPrescriptionPopup(false); // Close the popup
  };

  const handleAddFrame = (formData, img) => {
    setFrameData(formData);
    setFrameImg(img);
    setAddFramePopup(false); // Close the popup
  };

  return (
    <div className="flex items-start justify-start h-full">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />

        <div className="flex flex-col m-5 bg-white mt-28 md:mt-8">
          <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3">
            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                date
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                branch
              </label>
              <select
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                name="branch"
                id="branch"
                onChange={handleChange}
              >
                <option value="">Select a Branch</option>
                <option value="Matale-Main_branch">Matale - Main Branch</option>
                <option value="Kumundu">Kumudu Hospital Branch</option>
                <option value="Coop">CO-OP Hospital Branch</option>
              </select>
            </div>

            <div></div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                order number
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={orderNumber}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                bill number
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
                id="billNumber"
                name="billNumber"
                value={billNumber}
                onChange={handleChange}
              />
            </div>

            <div></div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                full name
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                contact number
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={contactNumber}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                date <span className="lowercase">of</span> birth
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start p-2 m-1 ">
            <label className="font-semibold capitalize text-md" htmlFor="">
              Permenant address
            </label>
            <input
              className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3">
            <div>
              <button
                onClick={() => {
                  setAddPrescriptionPopup(true);
                }}
                className="w-5/6 m-3 capitalize btn"
              >
                add prescription
              </button>
              {presData ? (
                <>
                  <CheckCircleOutlineIcon
                    fontSize="medium"
                    className="text-green-500"
                  />
                </>
              ) : (
                <>
                  <HighlightOffIcon
                    fontSize="medium"
                    className="text-red-500 scale-110"
                  />
                </>
              )}
            </div>
            <div>
              <button
                onClick={() => setAddFramePopup(true)}
                className="w-5/6 m-3 capitalize btn"
              >
                add frame
              </button>
              {frameData ? (
                <>
                  <CheckCircleOutlineIcon
                    fontSize="medium"
                    className="text-green-500"
                  />
                </>
              ) : (
                <>
                  <HighlightOffIcon
                    fontSize="medium"
                    className="text-red-500 scale-110"
                  />
                </>
              )}
            </div>{" "}
          </div>

          <div className="flex flex-col items-start justify-start p-2 m-1 ">
            <label className="font-semibold capitalize text-md" htmlFor="">
              lenses
            </label>
            <div className="grid w-2/3 grid-cols-2 md:grid-cols-3">
              <label htmlFor="single_vision" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="single_vision"
                  type="checkbox"
                  name="lense"
                  value="single_vision"
                />
                <span className="ml-2 capitalize ">single vision</span>
              </label>

              <label htmlFor="bi_focals" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="bi_focals"
                  type="checkbox"
                  name="lense"
                  value="bi_focals"
                />
                <span className="ml-2 capitalize ">Bi focals</span>
              </label>

              <label htmlFor="progressive" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="progressive"
                  type="checkbox"
                  name="lense"
                  value="progressive"
                />
                <span className="ml-2 capitalize ">progressive</span>
              </label>

              <label htmlFor="white" className="w-full p-1 px-4 mt-2 ">
                <input id="white" type="checkbox" name="lense" value="white" />
                <span className="ml-2 capitalize ">white</span>
              </label>

              <label htmlFor="utmc" className="w-full p-1 px-4 mt-2 ">
                <input id="utmc" type="checkbox" name="lense" value="utmc" />
                <span className="ml-2 uppercase ">utmc</span>
              </label>

              <label htmlFor="blue_cut" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="blue_cut"
                  type="checkbox"
                  name="lense"
                  value="blue_cut"
                />
                <span className="ml-2 capitalize ">blue cut</span>
              </label>

              <label htmlFor="photocrome" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="photocrome"
                  type="checkbox"
                  name="lense"
                  value="photocrome"
                />
                <span className="ml-2 capitalize ">photocrome</span>
              </label>

              <label htmlFor="tinted" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="tinted"
                  type="checkbox"
                  name="lense"
                  value="tinted"
                />
                <span className="ml-2 capitalize ">tinted</span>
              </label>

              <label htmlFor="high_index" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="high_index"
                  type="checkbox"
                  name="lense"
                  value="high_index"
                />
                <span className="ml-2 capitalize ">high index</span>
              </label>

              <label htmlFor="contact_lense" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="contact_lense"
                  type="checkbox"
                  name="lense"
                  value="contact_lense"
                />
                <span className="ml-2 capitalize ">contact lenses</span>
              </label>

              <label htmlFor="hi_1_60" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="hi_1_60"
                  type="checkbox"
                  name="lense"
                  value="hi_1_60"
                />
                <span className="ml-2 uppercase ">Hi 1.60</span>
              </label>

              <label htmlFor="hi_1_67" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="hi_1_67"
                  type="checkbox"
                  name="lense"
                  value="hi_1_67"
                />
                <span className="ml-2 uppercase ">Hi 1.67</span>
              </label>

              <label htmlFor="hi_1_74" className="w-full p-1 px-4 mt-2 ">
                <input
                  id="hi_1_74"
                  type="checkbox"
                  name="lense"
                  value="hi_1_74"
                />
                <span className="ml-2 uppercase ">Hi 1.74</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3">
            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                price
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                advance
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
                id="advance"
                name="advance"
                value={advance}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                balance
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
                id="balance"
                name="balance"
                value={balance}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                status
              </label>
              <select
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                name="status"
                id="status"
                onChange={handleChange}
              >
                <option value="">Select the status</option>
                <option value="sent">Sent to the Workshop</option>
                <option value="received">Received from the Workshop</option>
                <option value="delivered">Deliverded to the Customer</option>
              </select>
            </div>

            <div></div>
            <div></div>
            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                sent date
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="date"
                id="sentDate"
                name="sentDate"
                value={sentDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                received date
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="date"
                id="receivedDate"
                name="receivedDate"
                value={receivedDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1">
              <label
                className="font-semibold text-gray-400 capitalize text-md"
                htmlFor=""
              >
                Delivered date
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-gray-400 rounded-md outline-none"
                type="date"
                disabled
                id="deliveredDate"
                name="deliveredDate"
                value={deliveredDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start p-2 m-1 ">
            <label className="font-semibold capitalize text-md" htmlFor="">
              special notes
            </label>
            <textarea
              className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none "
              name="specialNote"
              id="specialNote"
              value={specialNote}
              onChange={handleChange}
            ></textarea>{" "}
          </div>

          <div className="flex justify-end m-3">
            <button
              onClick={handleClick}
              className="h-10 text-xl capitalize w-60 btn"
            >
              add patient
            </button>
          </div>
        </div>
      </div>

      <AddPrescription
        addTrigger={addPrescriptionPopup}
        setAddTrigger={setAddPrescriptionPopup}
        onAddPrescription={handleAddPrescription}
      ></AddPrescription>

      <AddFramePopup
        addTrigger={addFramePopup}
        setAddTrigger={setAddFramePopup}
        onAddFrame={handleAddFrame}
      ></AddFramePopup>
    </div>
  );
}

export default AddPatient;
