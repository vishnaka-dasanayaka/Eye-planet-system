import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import OrderCard from "../components/search_results/OrderCard";
import PatientCard from "../components/search_results/PatientCard";
import { useAuthToken } from "../apis/useAuthToken";
import { findPatients } from "../apis/patientAPIs";
import Loading from "../components/spinners/Loading";

function Find() {
  const token = useAuthToken();
  const [patientFindForm, setPatientFindForm] = useState({
    name: "",
    contactNumber: "",
    dob: "",
  });
  const [patients, setPatients] = useState([]);

  const { name, contactNumber, dob } = patientFindForm;

  const handlePatientChange = (e) => {
    setPatientFindForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePatientSearch = (e) => {
    e.preventDefault();
    fetchPatients();
  };
  const fetchPatients = async () => {
    if (token) {
      const response = await findPatients(token, patientFindForm);
      setPatients(response.data);
    }
  };

  if (!patients) return <Loading />;

  return (
    <div className="flex items-start justify-start h-screen">
      <Sidebar className="" />
      <div className="lg:ml-[288px] ml-0 w-full">
        <Header />

        <div className="flex flex-col">
          <div className="flex items-start justify-center">
            <div className="flex flex-col items-center justify-center p-2 pl-5 bg-white md:pl-10 rounded-3xl md:rounded-full md:mt-0 mt-28 md:flex-row h-fit w-fit">
              <div className="flex flex-col items-start justify-start px-2 py-1 mr-3 md:py-0 md:border-r-2 w-60">
                <h1 className="text-sm font-extrabold tracking-wide capitalize">
                  name
                </h1>
                <input
                  className="w-full p-1 outline-none"
                  placeholder="Enter name of the patient"
                  type="text"
                  name="name"
                  onChange={handlePatientChange}
                  value={name}
                />
              </div>

              <div className="flex flex-col items-start justify-start px-2 py-1 mr-3 md:py-0 md:border-r-2 w-60">
                <h1 className="text-sm font-extrabold tracking-wide capitalize">
                  contact number
                </h1>
                <input
                  className="w-full p-1 outline-none"
                  placeholder="Enter name of the patient"
                  type="text"
                  name="contactNumber"
                  onChange={handlePatientChange}
                  value={contactNumber}
                />
              </div>

              <div className="flex flex-col items-start justify-start px-2 py-1 mr-3 md:py-0 w-60">
                <h1 className="text-sm font-extrabold tracking-wide capitalize">
                  DOB
                </h1>
                <input
                  className="w-full p-1 outline-none"
                  placeholder="Enter name of the patient"
                  type="date"
                  name="dob"
                  onChange={handlePatientChange}
                  value={dob}
                />
              </div>

              <div
                onClick={handlePatientSearch}
                className="flex items-center justify-center w-full p-1 mt-5 rounded-full cursor-pointer md:mt-0 md:p-3 md:w-fit active:bg-blue-500 hover:bg-green-500 bg-shop_color"
              >
                <SearchIcon fontSize="large" className="text-white" />
              </div>
            </div>
          </div>

          <div className="flex items-start justify-center md:my-5">
            <div className="flex flex-col items-center justify-center p-2 pl-5 my-5 bg-white md:pl-10 rounded-3xl md:rounded-full md:flex-row h-fit w-fit">
              <div className="flex flex-col items-start justify-start px-2 py-1 mr-3 md:py-0 md:border-r-2 w-60">
                <h1 className="text-sm font-extrabold tracking-wide capitalize">
                  order number
                </h1>
                <input
                  className="w-full p-1 outline-none"
                  placeholder="Enter name of the patient"
                  type="text"
                />
              </div>

              <div className="flex flex-col items-start justify-start px-2 py-1 mr-3 md:py-0 w-60">
                <h1 className="text-sm font-extrabold tracking-wide capitalize">
                  bill number
                </h1>
                <input
                  className="w-full p-1 outline-none"
                  placeholder="Enter name of the patient"
                  type="text"
                />
              </div>

              <div className="flex items-center justify-center w-full p-1 mt-5 rounded-full cursor-pointer md:mt-0 md:p-3 md:w-fit active:bg-blue-500 hover:bg-green-500 bg-shop_color">
                <SearchIcon fontSize="large" className="text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 m-5 md:grid-cols-3">
            <OrderCard />
            <OrderCard />
            <OrderCard />
            {patients &&
              patients.map((patient) => (
                <>
                  <PatientCard patient={patient} />
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Find;
