import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import OrderCard from "../components/search_results/OrderCard";
import PatientCard from "../components/search_results/PatientCard";
import { useAuthToken } from "../apis/useAuthToken";
import { findPatients } from "../apis/patientAPIs";
import Loading from "../components/spinners/Loading";
import { findOrders } from "../apis/orderAPIs";
import { toast } from "sonner";

function Find() {
  const token = useAuthToken();
  const [patientFindForm, setPatientFindForm] = useState({
    name: null,
    contactNumber: null,
    dob: null,
  });
  const [orderFindForm, setOrderFindForm] = useState({
    orderNumber: null,
    billNumber: null,
  });
  const [patients, setPatients] = useState([]);
  const [orders, setOrders] = useState([]);

  const { name, contactNumber, dob } = patientFindForm;
  const { orderNumber, billNumber } = orderFindForm;

  const handlePatientChange = (e) => {
    setPatientFindForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOrderChange = (e) => {
    setOrderFindForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePatientSearch = (e) => {
    e.preventDefault();
    if (!name && !dob && !contactNumber) {
      toast.warning("No Searching Attributes !");
    } else {
      fetchPatients();
    }
  };

  const handleOrderSearch = (e) => {
    e.preventDefault();
    if (!orderNumber && !billNumber) {
      toast.warning("No Searching Attributes !");
    } else {
      fetchOrders();
    }
  };

  const fetchPatients = async () => {
    if (token) {
      const response = await findPatients(token, patientFindForm);
      setPatients(response.data);
    }
  };

  const fetchOrders = async () => {
    if (token) {
      const response = await findOrders(token, orderFindForm);
      setOrders(response.data);
    }
  };

  if (!patients && !orders) return <Loading />;

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
                  name="orderNumber"
                  value={orderNumber}
                  onChange={handleOrderChange}
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
                  name="billNumber"
                  value={billNumber}
                  onChange={handleOrderChange}
                />
              </div>

              <div
                onClick={handleOrderSearch}
                className="flex items-center justify-center w-full p-1 mt-5 rounded-full cursor-pointer md:mt-0 md:p-3 md:w-fit active:bg-blue-500 hover:bg-green-500 bg-shop_color"
              >
                <SearchIcon fontSize="large" className="text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 m-5 md:grid-cols-3">
            {orders &&
              orders.map((order) => (
                <>
                  <OrderCard order={order} />
                </>
              ))}
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
