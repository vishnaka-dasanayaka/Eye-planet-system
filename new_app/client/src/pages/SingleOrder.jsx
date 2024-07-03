import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { findPatient } from "../apis/patientAPIs";
import { useAuthToken } from "../apis/useAuthToken";
import { useParams } from "react-router-dom";
import Loading from "../components/spinners/Loading";
import { getOrder } from "../apis/orderAPIs";

function SingleOrder() {
  const token = useAuthToken();
  const params = useParams();

  const pId = params.Pid;
  const oId = params.Oid;

  const [patient, setPatient] = useState("");
  const [order, setOrder] = useState("");

  const fetchPatient = async () => {
    if (token) {
      const response = await findPatient(token, pId);
      setPatient(response.data.patient);
    }
  };

  const fetchOrder = async () => {
    if (token) {
      const response = await getOrder(token, oId);
      setOrder(response.data);
    }
  };

  useEffect(() => {
    fetchPatient();
    fetchOrder();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (!patient && !order) return <Loading />;

  return (
    <div className="flex items-start justify-start h-full">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />
        <div className="flex flex-col m-5 mt-28 md:mt-8">
          <h1 className="text-2xl font-semibold tracking-wide capitalize">
            {patient.name}
          </h1>

          <div className="grid grid-cols-3 mt-10">
            <div className="flex flex-col ">
              <h2 className="text-xs text-purple-500 capitalize">
                ordered date
              </h2>
              <h1 className="text-xl font-semibold">
                {formatDate(order.date)}
              </h1>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-xs text-purple-500 capitalize">
                order number{" "}
              </h2>
              <h1 className="text-xl font-semibold">{order.orderNumber}</h1>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-xs text-purple-500 capitalize">
                bill number{" "}
              </h2>
              <h1 className="text-xl font-semibold">{order.billNumber}</h1>
            </div>
          </div>

          <div className="grid grid-cols-3 mt-10">
            <div className="flex flex-col ">
              <h2 className="text-sm text-purple-500 capitalize">price </h2>
              <h1 className="text-xl font-semibold">{order.price}</h1>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-sm text-green-500 capitalize">advance</h2>
              <h1 className="text-xl font-semibold">{order.advance}</h1>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-sm text-red-500 capitalize">balance </h2>
              <h1 className="text-xl font-semibold">{order.balance}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
