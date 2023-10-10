import { useState } from "react";
import Logo from "../Assets/Images/l32.png"
import "../Assets/Styles/start.css";

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
      <img src={Logo} alt="Logo" className="justify-center px-5 py-5" />
        <ul className="py-10 gap-10 s  text-lg font-medium">
          <li
            className="hover:bg-yellow-500 px-5 py-6 w-full duration-300"
            onClick={() => toggleMenu("reservation")}
          >
            All Reservation
          </li>
          <li
            className="hover:bg-yellow-500 px-5 py-6 duration-300"
            onClick={() => toggleMenu("create")}
          >
            Create Reservation
          </li>
          <li
            className="hover:bg-yellow-500 px-5 py-6 duration-300"
            onClick={() => toggleMenu("create")}
          >
            All Train Schedules
          </li>
          <li
            className="hover:bg-yellow-500 px-5 py-6 duration-300"
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
