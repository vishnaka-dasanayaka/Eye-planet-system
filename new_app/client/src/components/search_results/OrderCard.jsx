import React from "react";
import { Link } from "react-router-dom";

function OrderCard() {
  return (
    <Link to={"/order"}>
      <div className="w-full transition duration-200 ease-in-out bg-green-300 rounded-lg cursor-pointer hover:scale-105 hover:bg-green-400 h-fit">
        <div className="py-5 pl-3">
          <div className="flex items-center justify-start w-full">
            <div className="w-1/2">
              <p className="text-xs capitalize">order number</p>
              <h1 className="text-lg font-extrabold tracking-wide capitalize">
                968
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-xs capitalize">bill number</p>
              <h1 className="text-lg font-extrabold tracking-wide capitalize">
                546
              </h1>
            </div>
          </div>
          <h2 className="mt-3 text-lg font-extrabold capitalize">
            Vishnaka dasanayaka
          </h2>
          <h2 className="font-semibold ">+94713704691</h2>
          <h2 className="font-semibold ">2000-Jan-23</h2>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
