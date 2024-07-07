import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthToken } from "../apis/useAuthToken";
import { findPatient } from "../apis/patientAPIs";
import Loading from "../components/spinners/Loading";
import OrderLabel from "../components/popups/profile_popups/OrderLabel";

function PatientProfile() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const calculateAge = (dateString) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birth month hasn't occurred yet this year, or it is the birth month but the day hasn't occurred yet, subtract one year from the age
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const token = useAuthToken();
  const [patient, setPatient] = useState();
  const [orders, setOrders] = useState();

  const id = useParams().id;

  const fetchData = async () => {
    if (token) {
      const response = await findPatient(token, id);
      console.log(response);
      setPatient(response.data.patient);
      setOrders(response.data.orders);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!patient && !orders) return <Loading />;

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
                className="w-full p-1 px-4 mt-2 capitalize border-2 border-purple-400 rounded-md outline-none"
                type="text"
                value={patient.name}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                contact number
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="text"
                value={patient.contactNumber}
              />
            </div>

            <div className="flex flex-col items-start justify-start p-2 m-1 ">
              <label className="font-semibold capitalize text-md" htmlFor="">
                date <span className="lowercase">of</span> birth
              </label>
              <input
                className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                type="date"
                value={formatDate(patient.dob)}
              />
              <h1 className="p-1 px-4 ">
                Age:
                <span className="ml-2 font-extrabold text-shop_color">
                  {calculateAge(patient.dob)}
                </span>{" "}
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start p-2 m-1 ">
            <label className="font-semibold capitalize text-md" htmlFor="">
              Permenant address
            </label>
            <input
              className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
              type="text"
              value={patient.address}
            />
          </div>

          <div className="flex justify-end m-3">
            <button className="h-10 text-xl capitalize w-60 btn">
              save details
            </button>
          </div>
          <div className="ml-3">
            <Link to={`../add-order/${patient._id}`}>
              <button className="flex items-center capitalize btn">
                <AddIcon className="mr-2" />
                new order
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-2 m-3 md:gap-5 md:grid-cols-3">
            {patient &&
              orders &&
              orders.map((order) => (
                <>
                  <OrderLabel order={order} />
                </>
              ))}
          </div>

          <div className="flex flex-col items-start justify-start p-2 m-1 ">
            <label className="font-semibold capitalize text-md" htmlFor="">
              history
            </label>
            <div className="mt-5 ml-5">
              {patient.history.map((record) => (
                <>
                  <p>{record}</p>
                  <br />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
