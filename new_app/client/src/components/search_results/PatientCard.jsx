import React from "react";
import { Link } from "react-router-dom";

function PatientCard({ patient }) {
  return (
    <Link
      to={{
        pathname: `/patient/${patient._id}`,
      }}
    >
      <div className="w-full transition duration-200 ease-in-out bg-yellow-300 rounded-lg cursor-pointer hover:scale-105 hover:bg-yellow-400 h-fit">
        <div className="py-5 pl-3">
          <h1 className="text-2xl font-extrabold tracking-wide capitalize">
            {patient.name}
          </h1>
          <h2 className="mt-3 font-semibold">+{patient.contactNumber}</h2>
          <h2 className="font-semibold ">{patient.dob}</h2>
          <h2 className="font-thin ">{patient.address}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PatientCard;
