import { useState } from "react";

const Dashboard = (props) => {
  const [componentState, setComponentState] = useState("reservation");

  const toggleMenu = (keyword) => {
    if (keyword === "reservation") {
      // render ALl
      setComponentState("reservation");
    } else {
      // create
      setComponentState("create");
    }
  };

  return (
    <div className="bg-[#0052A8] justify-start items-startflex flex-col py-10 h-screen ">
      <div className="text-white w-full">
        <h1 className="text-white text-3xl font-medium  px-5">
          Ticket Reservation
        </h1>
        <ul className="py-10 gap-10 s  font-medium">
          <li
            className="hover:bg-yellow-500 px-5 py-2 w-full duration-300"
            onClick={() => toggleMenu("reservation")}
          >
            All Reservation
          </li>
          <li
            className="hover:bg-yellow-500 px-5 py-2 duration-300"
            onClick={() => toggleMenu("create")}
          >
            Create Reservation
          </li>
          <li
            className="hover:bg-yellow-500 px-5 py-2 duration-300"
            onClick={() => toggleMenu("create")}
          >
            All Train Schedules
          </li>
          <li
            className="hover:bg-yellow-500 px-5 py-2 duration-300"
            onClick={() => toggleMenu("create")}
          >
            User Management
          </li>
        </ul>
      </div>

      {/* <div className="w-5/6 bg-white justify-center items-center flex flex-col py-10 h-full  ">
        {componentState === "reservation" ? (
          <AllReservation />
        ) : (
          <CreateReservation />
        )}
      </div> */}
    </div>
  );
};

export default Dashboard;
