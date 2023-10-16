import { useState } from "react";
import Logo from "../Assets/Images/l32.png";
import "../Assets/Styles/start.css";
import { useCookies } from "react-cookie";

const Dashboard = (props) => {
  const [componentState, setComponentState] = useState("reservation");
  const [cookies] = useCookies(["User"]);
  console.log(cookies.User.userRole);

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
        <br /><br/>
        <ul className="py-10 gap-10 s  text-lg font-medium">
          <li
            className="hover:bg-yellow-500 px-5 py-10 w-full duration-300"
            onClick={() => toggleMenu("usermanagement")}
          >
            Traveler Management
          </li>
          <li
            className="hover:bg-yellow-500 px-5 py-10 duration-300"
            onClick={() => toggleMenu("reservationmanagement")}
          >
            Reservation Management
          </li>
          {cookies.User?.userRole === "officer" ? (
          <li
            className="hover:bg-yellow-500 px-5 py-10 duration-300"
            onClick={() => toggleMenu("trainmanagement")}
          >
            Train Management
          </li>
          ) : null}
        </ul>
        <br/><br/><br/><br/>
        <center>
          <button
            type="button"
            class="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-600"
          >
            Logout
          </button>
        </center>
      </div>
    </div>
  );
};

export default Dashboard;
