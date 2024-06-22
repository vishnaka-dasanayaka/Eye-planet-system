import React from "react";
import { Link } from "react-router-dom";

function OrderCard({ order }) {
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
    <Link to={`/order/${order._id}/${order.patient}`}>
      <div className="w-full transition duration-200 ease-in-out bg-green-300 rounded-lg cursor-pointer hover:scale-105 hover:bg-green-400 h-fit">
        <div className="py-5 pl-3">
          <div className="flex items-center justify-start w-full">
            <div className="w-1/2">
              <p className="text-xs capitalize">order number</p>
              <h1 className="text-lg font-extrabold tracking-wide capitalize">
                {order.orderNumber}
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-xs capitalize">bill number</p>
              <h1 className="text-lg font-extrabold tracking-wide capitalize">
                {order.billNumber}
              </h1>
            </div>
          </div>
          <h2 className="mt-3 text-lg font-extrabold capitalize">
            {order.name}
          </h2>
          <h2 className="font-semibold ">{formatDate(order.dob)}</h2>
          <h2 className="font-semibold ">
            Age:{" "}
            <span className="font-extrabold">{calculateAge(order.dob)}</span>
          </h2>
          <h2 className="font-semibold ">{order.contactNumber}</h2>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
