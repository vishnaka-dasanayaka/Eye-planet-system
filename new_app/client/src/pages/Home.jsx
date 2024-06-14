import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getUsers } from "../apis/userAPI";
import { useAuthToken } from "../apis/useAuthToken";
import Loading from "../components/spinners/Loading";
import { getPatients } from "../apis/patientAPIs";

function Home() {
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const token = useAuthToken();

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        const response = await getUsers(token);
        setUsers(response.data);
      }
    };

    const fetchPatients = async () => {
      if (token) {
        const response = await getPatients(token);
        setPatients(response.data);
      }
    };

    fetchUsers();
    fetchPatients();
  }, [token]);

  if (!users && !patients) {
    return <Loading />;
  }
  return (
    <div className="flex items-start justify-start h-screen">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />

        <div className="m-5 mt-32 text-white bg-white md:mt-8">
          <div className="grid grid-cols-1 gap-10 p-10 sm:grid-cols-2">
            <div className="h-44 w-full bg-[#3B76EF] flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">branches</h1>
              <h1 className="mt-3 text-6xl font-extrabold">2</h1>
            </div>
            <div className="h-44 w-full bg-[#63C7FF] flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">
                user accounts
              </h1>
              <h1 className="mt-3 text-6xl font-extrabold">{users.length}</h1>
            </div>
            <div className="h-44 w-full bg-[#A66DD4] flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">
                total patient count
              </h1>
              <h1 className="mt-3 text-6xl font-extrabold">
                {patients.length}
              </h1>
            </div>
            <div className="h-44 w-full bg-[#6DD4B1] flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">
                active orders
              </h1>
              <h1 className="mt-3 text-6xl font-extrabold">2</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
