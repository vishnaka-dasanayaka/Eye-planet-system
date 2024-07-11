import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getUsers } from "../apis/userAPI";
import { useAuthToken } from "../apis/useAuthToken";
import Loading from "../components/spinners/Loading";
import { getPatients } from "../apis/patientAPIs";
import { getBranches } from "../apis/branchAPIs";
import { getOrders } from "../apis/orderAPIs";
import { useDispatch, useSelector } from "react-redux";
import { getBranchesForRedux } from "../features/branch/branchSlice";

function Home() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [branchCount, setBranchCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [patients, setPatients] = useState([]);
  const [branches, setBranches] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = useAuthToken();

  // start
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getBranchesForRedux());
    }
  }, [token]);
  // end

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        const response = await getUsers(token);
        setUsers(response.data);
        getACtiveUsers(response.data);
      }
    };

    const fetchPatients = async () => {
      if (token) {
        const response = await getPatients(token);
        setPatients(response.data);
      }
    };

    const fetchBranches = async () => {
      if (token) {
        const response = await getBranches(token);
        setBranches(response.data);
        getACtiveBranches(response.data);
      }
    };

    const fetchOrders = async () => {
      if (token) {
        const response = await getOrders(token);
        setOrders(response.data);
        getACtiveOrders(response.data);
      }
    };

    if (user.role === "admin") fetchUsers();
    fetchPatients();
    fetchBranches();
    fetchOrders();
  }, [token]);

  function getACtiveBranches(data) {
    let count = 0;
    for (let index = 0; index < data.length; index++) {
      if (data[index].status !== "disabled") count++;
    }
    setBranchCount(count);
  }

  function getACtiveUsers(data) {
    let count = 0;
    for (let index = 0; index < data.length; index++) {
      if (data[index].role !== "disabled") count++;
    }
    setUserCount(count);
  }

  function getACtiveOrders(data) {
    let count = 0;
    for (let index = 0; index < data.length; index++) {
      if (data[index].status !== "delivered") count++;
    }
    setOrderCount(count);
  }

  if (!users && !patients && !branches && !orders) {
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
              <h1 className="mt-3 text-6xl font-extrabold">
                {branchCount}
                <span className="text-3xl"> / {branches.length}</span>
              </h1>
            </div>
            {user.role === "admin" && (
              <div className="h-44 w-full bg-[#63C7FF] flex flex-col justify-center items-start pl-5 rounded-lg ">
                <h1 className="text-2xl font-extrabold capitalize">
                  user accounts
                </h1>
                <h1 className="mt-3 text-6xl font-extrabold">
                  {userCount}
                  <span className="text-3xl"> / {users.length}</span>
                </h1>
              </div>
            )}
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
              <h1 className="mt-3 text-6xl font-extrabold">
                {orderCount}
                <span className="text-3xl"> / {orders.length}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
