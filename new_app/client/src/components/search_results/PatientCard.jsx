import React from "react";
import { Link } from "react-router-dom";

function PatientCard({ patient }) {
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

  return (
    <Link
      to={{
        pathname: `/patient/${patient._id}`,
      }}
    >
      <div className="w-full transition duration-200 ease-in-out bg-yellow-500 rounded-lg cursor-pointer hover:scale-[1.03] hover:bg-yellow-400 h-fit">
        <div className="py-5 pl-3">
          <h1 className="text-2xl font-extrabold tracking-wide capitalize">
            {patient.name}
          </h1>
          <h2 className="mt-3 font-semibold">+{patient.contactNumber}</h2>
          <h2 className="font-semibold ">{formatDate(patient.dob)}</h2>
          <h2 className="font-semibold ">
            Age:
            <span className="ml-2 font-extrabold">
              {calculateAge(patient.dob)}
            </span>
          </h2>
          <h2 className="font-thin ">
            {patient.address ? (
              patient.address
            ) : (
              <span>- address isn't provided -</span>
            )}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PatientCard;
