import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
function Home() {
  return (
    <div className="flex items-start h-screen justify-start">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />

        <div className="bg-white text-white mt-32 md:mt-8 m-5">
          <div className="sm:grid-cols-2 grid-cols-1  p-10  grid gap-10">
            <div className="h-44 w-full bg-[#3B76EF] flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">branches</h1>
              <h1 className="text-6xl font-extrabold mt-3">2</h1>
            </div>
            <div className="h-44 w-full bg-[#63C7FF] flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">
                user accounts
              </h1>
              <h1 className="text-6xl font-extrabold mt-3">2</h1>
            </div>
            <div className="h-44 w-full bg-[#A66DD4] flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">
                total patient count
              </h1>
              <h1 className="text-6xl font-extrabold mt-3">2</h1>
            </div>
            <div className="h-44 w-full bg-[#6DD4B1] flex flex-col justify-center items-start pl-5 rounded-lg ">
              <h1 className="text-2xl font-extrabold capitalize">
                active orders
              </h1>
              <h1 className="text-6xl font-extrabold mt-3">2</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
