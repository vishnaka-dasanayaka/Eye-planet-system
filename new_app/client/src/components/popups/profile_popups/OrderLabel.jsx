import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderLabel({ order }) {
  const [lenses, setLenses] = useState();

  useEffect(() => {
    setLenses(order.lenses);
    console.log(order.lenses);
  }, []);
  return (
    <Link to={`/order/${order._id}/${order.patient} `}>
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
            {order.branch}
          </h2>
          <h2 className="font-semibold capitalize ">{order.status}</h2>
          <h2 className="font-semibold ">
            Balance: <span className="font-extrabold">{order.balance}</span>
          </h2>

          <h2 className="font-semibold">Lenses:</h2>

          {lenses && (
            <div className="flex items-center">
              {lenses.map((lens, index) => (
                <h2 className="mr-2 text-xs font-thin capitalize " key={index}>
                  {lens}
                </h2>
              ))}
            </div>
          )}
          {/* <h2 className="font-semibold ">{order.lenses}</h2> */}
        </div>
      </div>
    </Link>
  );
}

export default OrderLabel;
