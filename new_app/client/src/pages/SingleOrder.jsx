import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function SingleOrder() {
  return (
    <div className="flex items-start justify-start h-full">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />
        <div>ooo</div>
      </div>
    </div>
  );
}

export default SingleOrder;
