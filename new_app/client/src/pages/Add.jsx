import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import PatientCard from "../components/search_results/PatientCard";
import { Link } from "react-router-dom";
import { getPatients } from "../apis/patientAPIs";
import { useAuthToken } from "../apis/useAuthToken";
import Loading from "../components/spinners/Loading";

function Add() {
  const [patients, setPatients] = useState([]);
  const token = useAuthToken();

  const fetchPatients = async () => {
    if (token) {
      const response = await getPatients(token);
      setPatients(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (!patients) return <Loading />;
  return (
    <div className="flex items-start justify-start h-screen">
      <Sidebar className="" />
      <div className="lg:ml-[288px] ml-0 w-full">
        <Header />

        <div className="flex flex-col md:mt-0 mt-28">
          <Link to={"/addpatient"}>
            <button className="flex items-center m-5 capitalize w-fit btn_green">
              <AddIcon className="mr-2" />
              add patient
            </button>
          </Link>
          <div className="grid grid-cols-1 gap-3 m-5 md:grid-cols-3">
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

export default Add;
