import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrderCard from "../components/search_results/OrderCard";
import { useState } from "react";
import AddOrder from "../components/popups/add_patient_popups/AddOrder";

function PatientProfile() {
  const [addOrderPopup, setAddOrderPopup] = useState(false);
  return (
    <div className="flex items-start justify-start h-full">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />

        <div className="flex flex-col m-5 bg-white mt-28 md:mt-8">
          <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3">
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
          <div className="ml-3">
            <button
              onClick={() => setAddOrderPopup(true)}
              className="flex items-center capitalize btn"
            >
              <AddIcon className="mr-2" />
              new order
            </button>{" "}
          </div>
          <div className="grid grid-cols-1 m-3 md:gap-5 md:grid-cols-3">
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
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
              save details
            </button>
          </div>

          <div className="flex flex-col items-start justify-start p-2 m-1 ">
            <label className="font-semibold capitalize text-md" htmlFor="">
              history
            </label>
            <div className="mt-5 ml-5">
              <p>Created by Vishnaka</p>
              <p>A prescription is added by Vishnaka</p>
            </div>
          </div>
        </div>
      </div>

      <AddOrder
        addTrigger={addOrderPopup}
        setAddTrigger={setAddOrderPopup}
      ></AddOrder>
    </div>
  );
}

export default PatientProfile;
