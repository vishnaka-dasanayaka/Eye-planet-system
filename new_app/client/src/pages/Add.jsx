import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import PatientCard from "../components/search_results/PatientCard";
import { Link } from "react-router-dom";

function Add() {
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
            <PatientCard />
            <PatientCard />
            <PatientCard />
            <PatientCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
