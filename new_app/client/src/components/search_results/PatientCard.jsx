import React from "react";
import { Link } from "react-router-dom";

function PatientCard() {
  return (
    <Link to={"/patient"}>
      <div className="w-full transition duration-200 ease-in-out bg-yellow-300 rounded-lg cursor-pointer hover:scale-105 hover:bg-yellow-400 h-fit">
        <div className="py-5 pl-3">
          <h1 className="text-2xl font-extrabold tracking-wide capitalize">
            vishnaka dasanayaka
          </h1>
          <h2 className="mt-3 font-semibold">+94713704691</h2>
          <h2 className="font-semibold ">2000-Jan-23</h2>
          <h2 className="font-thin ">72/D, Alapalawala, Handessa</h2>
        </div>
      </div>
    </Link>
  );
}

export default PatientCard;
