import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RoomIcon from "@mui/icons-material/Room";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CallIcon from "@mui/icons-material/Call";
import CopyrightIcon from "@mui/icons-material/Copyright";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { getBranches } from "../apis/branchAPIs";
import { useAuthToken } from "../apis/useAuthToken";
import Loading from "../components/spinners/Loading";

function Contacts() {
  const [branches, setBranches] = useState([]);

  const token = useAuthToken();

  const fetchBranches = async () => {
    if (token) {
      const response = await getBranches(token);
      setBranches(response.data);
      console.log(branches);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  if (!branches) return <Loading />;
  return (
    <div className="flex items-start justify-start h-full">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />

        <div className="flex flex-wrap justify-center gap-10 m-5 md:mt-0 mt-28 ">
          <div className="rounded-2xl w-[360px] bg-[#641c7c] text-white h-fit">
            <div className="bg-gray-200 h-60 rounded-t-2xl">
              <img
                className="object-contain w-full h-full pb-1 rounded-t-2xl"
                src="../assets/imgs/owner.png"
              ></img>
            </div>
            <div className="py-5 pl-4 ">
              <h1 className="text-2xl font-extrabold tracking-wide text-center">
                owner
              </h1>
              <div className="flex items-center justify-start mt-5">
                <CopyrightIcon className="scale-90" />
                <h2 className="ml-2 text-lg font-semibold">
                  Hashan Thennakoon
                </h2>
              </div>
              <div className="flex items-center justify-start mt-3">
                <AddHomeWorkIcon className="scale-90" />
                <h2 className="ml-2 text-lg font-semibold">
                  Optician, General Hospital, Matale
                </h2>
              </div>
              <div className="flex items-center justify-start mt-3">
                <AlternateEmailIcon className="scale-90" />
                <h2 className="ml-2 text-lg font-semibold">main@gmail.com</h2>
              </div>
              <div className="flex items-center justify-start mt-3">
                <CallIcon className="scale-90" />
                <h2 className="ml-2 text-lg font-semibold">+94 xx xxx xxxx</h2>
              </div>
              <div className="flex items-center justify-start mt-3">
                <CallIcon className="scale-90" />
                <h2 className="ml-2 text-lg font-semibold">+94 xx xxx xxxx</h2>
              </div>
            </div>
          </div>

          {branches &&
            branches.map((branch) => (
              <>
                {branch.status !== "disabled" && (
                  <div className="rounded-2xl w-[360px] bg-[#395066] text-white h-fit">
                    <div className="bg-red-300 h-60 rounded-t-2xl">
                      <img
                        className="object-cover w-full h-full rounded-t-2xl"
                        src={branch.branchImg}
                      ></img>
                    </div>
                    <div className="p-5">
                      <h1 className="text-xl font-extrabold text-center">
                        {branch.branchName}{" "}
                        {branch.status === "main" ? <>- Main Branch</> : <></>}
                      </h1>
                      <div className="flex items-center justify-start mt-5">
                        <SupportAgentIcon className="scale-90" />
                        <h2 className="ml-2 text-lg font-semibold">
                          {branch.branchCoordinator}
                        </h2>
                      </div>
                      <div className="flex items-center justify-start mt-3">
                        <RoomIcon className="scale-90" />
                        <h2 className="ml-2 text-lg font-semibold">
                          {branch.address}
                        </h2>
                      </div>
                      <div className="flex items-center justify-start mt-3">
                        <AlternateEmailIcon className="scale-90" />
                        <h2 className="ml-2 text-lg font-semibold">
                          {branch.email}
                        </h2>
                      </div>
                      <div className="flex items-center justify-start mt-3">
                        <CallIcon className="scale-90" />
                        <h2 className="ml-2 text-lg font-semibold">
                          {branch.contactNumber}
                        </h2>
                      </div>
                      <div className="flex items-center justify-start mt-3">
                        <CallIcon className="scale-90" />
                        <h2 className="ml-2 text-lg font-semibold">
                          {branch.contactNumber2}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
