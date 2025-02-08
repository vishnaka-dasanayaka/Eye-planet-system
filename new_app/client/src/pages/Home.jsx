import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuthToken } from "../apis/useAuthToken";
import { useDispatch, useSelector } from "react-redux";
import { getBranchesForRedux } from "../features/branch/branchSlice";
import { getCounts } from "../apis/countAPIs";
import Loading from "../components/spinners/Loading";
import { Link } from "react-router-dom";

function Home() {
  const token = useAuthToken();
  const dispatch = useDispatch();
  const [counts, setCounts] = useState();

  useEffect(() => {
    if (token) {
      dispatch(getBranchesForRedux());
      fetchCounts();
    }
  }, [token]);

  const { user } = useSelector((state) => state.auth);
  const { branch } = useSelector((state) => state.branch);

  const fetchCounts = async () => {
    const response = await getCounts(token);
    setCounts(response.data);
  };

  if (!counts) return <Loading />;

  return (
    <div className="flex items-start justify-start h-screen">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />

        <div className="m-5 mt-32 text-white bg-white md:mt-8">
          <div className="grid grid-cols-1 gap-10 p-10 sm:grid-cols-2">
            <Link to={user.role === "admin" ? "./admin" : "/"}>
              <div className="h-44 w-full bg-gray-600 flex flex-col justify-center items-start pl-5 rounded-lg ">
                <h1 className="text-2xl font-extrabold capitalize">branches</h1>
                <h1 className="mt-3 text-6xl font-extrabold">
                  {branch.filter((item) => item.status !== "disabled").length}
                  <span className="text-3xl"> / {branch.length}</span>
                </h1>
              </div>
            </Link>
            {user.role === "admin" && (
              <Link to={"./admin"}>
                <div className="h-44 w-full bg-gray-400 flex flex-col justify-center items-start pl-5 rounded-lg ">
                  <h1 className="text-2xl font-extrabold capitalize">
                    user accounts
                  </h1>
                  <h1 className="mt-3 text-6xl font-extrabold">
                    {counts.activeUsers}
                    <span className="text-3xl"> / {counts.users}</span>
                  </h1>
                </div>
              </Link>
            )}
            <Link to={"./add"}>
              <div className="h-44 w-full bg-gray-500 flex flex-col justify-center items-start pl-5 rounded-lg ">
                <h1 className="text-2xl font-extrabold capitalize">
                  total patient count
                </h1>
                <h1 className="mt-3 text-6xl font-extrabold">
                  {counts.patients}
                </h1>
              </div>
            </Link>
            <div className="h-44 w-full bg-black flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">
                active orders
              </h1>
              <h1 className="mt-3 text-6xl font-extrabold">
                {counts.activeOrders}
                <span className="text-3xl"> / {counts.orders}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
