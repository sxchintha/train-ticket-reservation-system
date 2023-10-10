import React from "react";
import Dashboard from "../component/navBar";

const AllTrains = () => {
  return (
    <div className="w-screen gap-4 h-screen bg-white  flex  ">
      <div className="w-1/6">
        <Dashboard />
      </div>
      <div>AllTrains</div>
    </div>
  );
};

export default AllTrains;
