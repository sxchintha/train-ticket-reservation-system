import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Dashboard from "../component/navBar";
import { getAllBookings } from "../services/bookingManagementService";
import "../Assets/Styles/start.css";

const Searchtrain = () => {
  const [bookings, setBookings] = useState([]);
  // const [cookies, setCookie] = useCookies(["User"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const setMinMaxDate = () => {
      const today = new Date().toISOString().split("T")[0];
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      const thirtyDaysLater = maxDate.toISOString().split("T")[0];

      const dateInput = document.getElementById("date-input");
      dateInput.min = today;
      dateInput.max = thirtyDaysLater;
    };

    setMinMaxDate();

    // return () => {
    //   document
    //     .getElementById("date-input")
    //     .removeEventListener("focus", setMinMaxDate);
    // };
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { field1: "Select a Station" },
    { field1: "Galle" },
    { field1: "Colombo Fort" },
    { field1: "Jaffna" },
  ];

  const initialFormState = {
    fromStation: "",
    toStation: "",
    date: "",
    numberOfPassengers: 1,
  };

  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormValues(initialFormState);
  };

  const searchForTrain = async () => {
    const data = {
      startStation,
      endStation,
      date,
    };

    const response = await searchForTrain(data);
    if (response != false) {
      Swal.fire("Train Found");
    } else {
      Swal.fire("Error Finding Train");
    }
  };
  return (
    <>
      <div className="w-screen gap-4 h-screen bg-white  flex  ">
        <div className="w-1/6">
          <Dashboard />
        </div>
        <div className="relative overflow-x-auto w-5/6 px-10 pt-20">
          <div className="text-center">
            <div className="mx-auto border border-gray-500 p-4 rounded-lg">
              <h1 className="font-bold text-4xl text-gray-700">
                Search Trains
              </h1>
              <br />

              <nav class="flex justify-center" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                  <li class="inline-flex items-center">
                    <Link to="/selectmanagement">
                      <a
                        href="#"
                        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-dark"
                      >
                        <svg
                          class="w-3 h-3 mr-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Home
                      </a>
                    </Link>
                  </li>
                  <Link to="/reservationmanagement">
                    <li aria-current="page">
                      <div class="flex items-center">
                        <svg
                          class="w-3 h-3 text-gray-400 mx-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                          Ticket Reservation Management
                        </span>
                      </div>
                    </li>
                  </Link>
                  <li aria-current="page">
                    <div class="flex items-center">
                      <svg
                        class="w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                        Search Trains
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />

          <br />

          <form className="space-y-6" action="#">
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  From Station
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                  name="fromStation"
                >
                  <option value="" disabled>
                    Select a Station
                  </option>
                  {options.map((option) => (
                    <option key={option.field1} value={option.field1}>
                      {option.field1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  To Station
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                  name="toStation"
                >
                  <option value="" disabled>
                    Select a Station
                  </option>
                  {options.map((option) => (
                    <option key={option.field1} value={option.field1}>
                      {option.field1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  No of Passengers
                </label>
                <input
                  type="number"
                  name="numberOfPassengers"
                  min={1}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                  placeholder="Enter No of Passengers"
                />
              </div>
            </div>
            <center>
              <Link to="/trainlisting">
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Search Train
                </button>
              </Link>
              <button
                type="submit"
                onClick={resetForm}
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Reset
              </button>
            </center>
          </form>
          <br />
          <footer class="bg-white rounded-lg dark: m-8">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-10">
              <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023 TRACLIN. All Rights Reserved.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Searchtrain;
