import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddPrescription from "../components/popups/add_patient_popups/AddPrescription";
import AddFramePopup from "../components/popups/add_patient_popups/AddFramePopup";

function AddPatient() {
  const [addPrescriptionPopup, setAddPrescriptionPopup] = useState(false);
  const [addFramePopup, setAddFramePopup] = useState(false);
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
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                branch
              </label>
              <select
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                name=""
                id=""
              >
                <option value="">Select a Branch</option>
                <option value="">Matale - Main Branch</option>
                <option value="">Kumudu Hospital Branch</option>
                <option value="">CO-OP Hospital Branch</option>
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
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                bill number
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
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
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                contact number
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                date <span className="lowercase">of</span> birth
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="date"
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
              <CheckCircleOutlineIcon
                fontSize="medium"
                className="text-green-500"
              />
            </div>
            <div>
              <button
                onClick={() => setAddFramePopup(true)}
                className="w-5/6 m-3 capitalize btn"
              >
                add frame
              </button>
              <HighlightOffIcon
                fontSize="medium"
                className="text-red-500 scale-110"
              />
            </div>{" "}
          </div>

          <div className="flex flex-col items-start justify-start p-2 m-1 ">
            <label className="font-semibold capitalize text-md" htmlFor="">
              lenses
            </label>
            <div className="grid w-2/3 grid-cols-2 md:grid-cols-3">
              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">single vision</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">Bi focals</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">progressive</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">white</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 uppercase ">utmc</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">blue cut</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">photocrome</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">tinted</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">high index</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 capitalize ">contact lenses</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 uppercase ">Hi 1.60</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
                <span className="ml-2 uppercase ">Hi 1.67</span>
              </label>

              <label htmlFor="" className="w-full p-1 px-4 mt-2 ">
                <input type="checkbox" />
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
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                advance
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                balance
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                status
              </label>
              <select
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                name=""
                id=""
              >
                <option value="">Select the status</option>
                <option value="">Sent to the Workshop</option>
                <option value="">Received from the Workshop</option>
                <option value="">Deliverded to the Customer</option>
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
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                received date
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="date"
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
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start p-2 m-1 ">
            <label className="font-semibold capitalize text-md" htmlFor="">
              special notes
            </label>
            <textarea
              className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none "
              name=""
              id=""
            ></textarea>{" "}
          </div>

          <div className="flex justify-end m-3">
            <button className="h-10 text-xl capitalize w-60 btn">
              add patient
            </button>
          </div>
        </div>
      </div>

      <AddPrescription
        addTrigger={addPrescriptionPopup}
        setAddTrigger={setAddPrescriptionPopup}
      ></AddPrescription>

      <AddFramePopup
        addTrigger={addFramePopup}
        setAddTrigger={setAddFramePopup}
      ></AddFramePopup>
    </div>
  );
}

export default AddPatient;
