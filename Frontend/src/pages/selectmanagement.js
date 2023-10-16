import { Outlet, Link } from "react-router-dom";
import "../Assets/Styles/start.css";
import tr from "../Assets/Images/winter-bus_01.gif";
import tb from "../Assets/Images/find-_-book-meeting-rooms.gif";
import tm from "../Assets/Images/catching-train-train.gif";
import { useCookies } from "react-cookie";

function Selectmanagement() {
  const [cookies] = useCookies(["User"]);
  console.log(cookies.User.userRole);
  return (
    <div className="background-container">
      <h1 className="font-bold text-5xl text-gray-700">
        Train Ticket Reservation System
      </h1>
      <div className="">
        <div className="gap-10 flex py-20">
          {/* <Link to="/login">
            <button className="py-10 font-semibold w-60 bg-[#0052A8] hover:text-white text-3xl hover:border-white border-yellow-500 hover:border-4 border-4 rounded-xl text-yellow-400  duration-300  ">
              Travel Agent
            </button>
          </Link>

          <Link to="/login">
            <button className="py-10 w-60 font-semibold bg-[#0052A8] hover:text-white text-3xl hover:border-white border-yellow-500 hover:border-4 border-4 rounded-xl text-yellow-400 duration-300  ">
            Back Office
            </button>
          </Link>
          <Link to="/login">
            <button className="py-10 w-60 font-semibold bg-[#0052A8] hover:text-white text-3xl hover:border-white border-yellow-500 hover:border-4 border-4 rounded-xl text-yellow-400 duration-300  ">
            Back Office
            </button>
          </Link> */}

          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-lg" src={tr} alt="" />
            <div class="p-5">
              <center>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Traveler <br />
                    Management
                  </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Manage traveler information here
                </p>
                <Link to="/usermanagement">
                  <a
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#0052A8] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#0052A8] dark:focus:ring-blue-800"
                  >
                    Go to Traveler Management
                    <svg
                      class="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </Link>
              </center>
            </div>
          </div>

          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-lg" src={tb} alt="" />
            <div class="p-5">
              <center>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Ticket Reservation
                    <br /> Management
                  </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Manage ticket reservation information here
                </p>
                <Link to="/reservationmanagement">
                  <a
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#0052A8] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#0052A8] dark:focus:ring-blue-800"
                  >
                    Go to Tickect Reservation
                    <svg
                      class="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </Link>
              </center>
            </div>
          </div>
          {cookies.User?.userRole === "officer" ? (
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img class="rounded-t-lg" src={tm} alt="" />
              </a>
              <div class="p-5">
                <center>
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Train <br />
                      Management
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Manage tain schedules and information here
                  </p>
                  <Link to="/trainmanagement">
                  <a
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#0052A8] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-[#0052A8] dark:focus:ring-blue-800"
                  >
                    Go to Train Management
                    <svg
                      class="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                  </Link>
                </center>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Selectmanagement;
