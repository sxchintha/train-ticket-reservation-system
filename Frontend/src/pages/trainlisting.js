import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../component/navBar";
import "../Assets/Styles/start.css";
import Swal from "sweetalert2";
import { isValidEmail, isValidPhoneNumber } from "../utils/validations";
import {
  createBooking,
  editBooking,
} from "../services/bookingManagementService";

const Trainlisting = () => {
  const [isModalstationsOpen, setIsModalstationsOpen] = useState(false);
  const [isModaltrainselectOpen, setIsModaltrainselectOpen] = useState(false);
  const [selectedTrainName, setSelectedTrainName] = useState(null);
  const [selectedTrainId, setSelectedTrainId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [nic, setNic] = useState(null);
  const [stations, setStations] = useState([]);
  const [email, setEmail] = useState(null);
  const [phone, setPhoneNumber] = useState(null);
  const [passengerCount, setPassengerCount] = useState(null);
  const [pricePerTicket, setPricePerTicket] = useState(null);
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [trainList, setTrainList] = useState([]);
  const [reservationDate, setReservationDate] = useState(null);
  const [reservationTime, setReservationTime] = useState(null);

  useEffect(() => {
    if (location.state) {
      console.log("Location", location.state.data);
      setTrainList(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    console.log("Location==========", location.state);
    if (location.state.fromEdit != false) {
      console.log("Location", location.state.booking);
      setFirstName(location.state.booking.firstName);
      setLastName(location.state.booking.lastName);
      setNic(location.state.booking.nic);
      setEmail(location.state.booking.email);
      setPhoneNumber(location.state.booking.phone);
      setPassengerCount(location.state.booking.quentity);
      setReservationDate(location.state.booking.sheduledate);
      setReservationTime(location.state.booking.sheduletime);
    }
  }, [location.state]);

  const toggleModalstations = () => {
    setIsModalstationsOpen(!isModalstationsOpen);
  };

  const toggleModaltrainselect = () => {
    setIsModaltrainselectOpen(!isModaltrainselectOpen);
    setSelectedTrainId(null);
    setSelectedTrainName(null);
  };

  const handlecreateBooking = async (e) => {
    e.preventDefault();
    if (!nic || !passengerCount || !reservationDate || !reservationTime) {
      // alert("Please fill in all the fields");
      Swal.fire("Please fill in all the fields");
    } else {
      const date = new Date();
      const data = {
        id: "",
        nic,
        sheduledate: reservationDate,
        sheduletime: reservationTime,
        quentity: passengerCount,
        trainID: selectedTrainId,
        trainName: selectedTrainName,
        fromStation: location.state.fromStation,
        toStation: location.state.toStation,
        price: price.toString(),
        createdDate: "2021-10-12",
      };

      console.log("Sending", data);

      const response = await createBooking(data);
      console.log("Response", response.response?.data);
      if (response.status == 201) {
        Swal.fire("Booking Created Successfully");
        navigate("/reservationmanagement");
      } else {
        Swal.fire("Error Creating Booking", response.response?.data);
      }
    }
  };

  const handleBookingEdit = async (e) => {
    e.preventDefault();

    const date = new Date();
    const data = {
      id: location.state.booking.id,
      nic,
      sheduledate: reservationDate,
      sheduletime: reservationTime,
      quentity: passengerCount,
      trainID: selectedTrainId,
      trainName: selectedTrainName,
      fromStation: location.state.fromStation,
      toStation: location.state.toStation,
      price: price.toString(),
      createdDate: "2021-10-12",
    };

    console.log("Sending", data);

    const response = await editBooking(location.state.booking.id, data);
    console.log("Response", response);

    if (response.status == 200) {
      Swal.fire("Booking Edited Successfully");
      navigate("/reservationmanagement");
    } else {
      Swal.fire("Error Creating Booking");
    }
  };

  useEffect(() => {
    if (passengerCount != null && pricePerTicket != null) {
      setPrice(passengerCount * pricePerTicket);
      console.log("Train ", trainList);
    }
  }, [passengerCount, pricePerTicket]);

  useEffect(() => {}, []);

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
                Available Train Info
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
                  <Link to="/searchtrain">
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
                        Available Train Info
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96v256c0 51.815-61.624 96-130.022 96l62.98 49.721C386.905 502.417 383.562 512 376 512H72c-7.578 0-10.892-9.594-4.957-14.279L130.022 448C61.82 448 0 403.954 0 352V96C0 42.981 64 0 128 0h192c65 0 128 42.981 128 96zM200 232V120c0-13.255-10.745-24-24-24H72c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h104c13.255 0 24-10.745 24-24zm200 0V120c0-13.255-10.745-24-24-24H272c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h104c13.255 0 24-10.745 24-24zm-48 56c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm-256 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z" />
            </svg>
            <p className="font text-0.5 text-gray-500">Train Info</p>
          </div>

          <div class="flex items-center space-x-2">
            <h1 className="font text-3xl text-gray-700">
              {location.state.fromStation}
            </h1>
            <svg
              class="w-6 h-6 text-gray-700 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
            <h1 className="font text-3xl text-gray-700">
              {location.state.toStation}
            </h1>
          </div>

          <p className="font text-0.5 text-gray-400">
            Select a train and proceed
          </p>
          <br />

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-black-200 uppercase bg-blue-100">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Train ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Train Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Available Seats
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                  End Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price P.P
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Stations
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <br />
            <tbody>
              {trainList.map((train, index) => (
                // console.log("Train", train);
                <tr className="bg-white border-b">
                  <th scope="col" className="px-6 py-3">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{train.trainID}</td>
                  <td className="px-6 py-4">{train.trainName}</td>
                  <td className="px-6 py-4">{train.availableSeats}</td>
                  <td className="px-6 py-4">
                    {train.schedule.departureTime.slice(11, -4)}
                  </td>
                  <td className="px-6 py-4">
                    {train.schedule.arrivalTime.slice(11, -4)}
                  </td>
                  <td className="px-6 py-4">
                    {train.schedule.arrivalTime.slice(0, -13)}
                  </td>
                  <td className="px-6 py-4">LKR {train.pricePerTicket}</td>
                  <td class="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          train.publishStatus === "Published"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } mr-2`}
                      ></div>
                      {train.publishStatus === "Published"
                        ? "Available"
                        : "Unavailable"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStations(train.schedule.stationDistances);
                        setIsModalstationsOpen(true);
                      }}
                      class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                      <svg
                        class="w-3 h-3 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 14"
                      >
                        <g
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                        </g>
                      </svg>
                    </button>
                  </td>
                  <td className="px-6 py-4 gap-0 flex">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTrainName(train.trainName);
                        setSelectedTrainId(train.trainID);
                        setPricePerTicket(train.pricePerTicket);
                        setIsModaltrainselectOpen(true);
                      }}
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <svg
                        class="w-3 h-3 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* station list */}
          {isModalstationsOpen && (
            <div className="modal-overlay">
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative bg-white rounded-lg">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={toggleModalstations}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                      <center>
                        <h1
                          className="mb-4 text-xl font-bold text-gray-900 dark:text-dark"
                          style={{ fontSize: "1.5rem" }}
                        >
                          Stopping Station List
                        </h1>
                      </center>
                      <br />

                      <div class="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-black-200 uppercase bg-blue-100">
                            <tr className="">
                              <th scope="col" className="px-6 py-3">
                                No
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Station
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Distance
                              </th>
                            </tr>
                          </thead>
                          <br />
                          <tbody>
                            {stations.map((station, index) => (
                              <tr className="bg-white border-b">
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                >
                                  {index + 1}
                                </th>
                                <td className="px-6 py-4">{station.station}</td>
                                <td className="px-6 py-4">
                                  {station.distanceFromStart} KM
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* train select */}
          {isModaltrainselectOpen && (
            <div className="modal-overlay">
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative bg-white rounded-lg">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={toggleModaltrainselect}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                      <center>
                        <h1
                          className="mb-4 text-xl font-bold text-gray-900 dark:text-dark"
                          style={{ fontSize: "1.5rem" }}
                        >
                          Confirm Reservation
                        </h1>
                      </center>
                      <div className="flex flex-col items-center space-y-1/2">
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                          >
                            <path d="M448 96v256c0 51.815-61.624 96-130.022 96l62.98 49.721C386.905 502.417 383.562 512 376 512H72c-7.578 0-10.892-9.594-4.957-14.279L130.022 448C61.82 448 0 403.954 0 352V96C0 42.981 64 0 128 0h192c65 0 128 42.981 128 96zM200 232V120c0-13.255-10.745-24-24-24H72c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h104c13.255 0 24-10.745 24-24zm200 0V120c0-13.255-10.745-24-24-24H272c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h104c13.255 0 24-10.745 24-24zm-48 56c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm-256 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z" />
                          </svg>
                          <p className="font text-0.5 text-gray-500">
                            Train Info
                          </p>
                        </div>
                        <p className="font text-0.5 text-gray-400">
                          {selectedTrainId} | {selectedTrainName}
                        </p>
                        <p className="font text-0.5 text-red-800">
                          LKR {price}
                        </p>
                      </div>
                      <br />
                      <form className="space-y-6" action="#">
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              NIC
                            </label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              placeholder="Enter Traveler NIC"
                              required
                              value={nic}
                              onChange={(e) => {
                                setNic(e.target.value);
                              }}
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
                              // min={1}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              placeholder="Enter no Passengers"
                              required
                              value={passengerCount}
                              onChange={(e) => {
                                setPassengerCount(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Reservation Date
                            </label>
                            <input
                              type="date"
                              // min={1}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              defaultValue={reservationDate}
                              onChange={(e) => {
                                setReservationDate(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Reservation Time
                            </label>
                            <input
                              type="time"
                              // min={1}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              defaultValue={reservationTime}
                              // value={passengerCount}
                              onChange={(e) => {
                                setReservationTime(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        {location.state.fromEdit != false ? (
                          <button
                            // type="submit"
                            onClick={handleBookingEdit}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Edit Reservation
                          </button>
                        ) : (
                          <button
                            // type="submit"
                            onClick={handlecreateBooking}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Confirm Reservation
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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

export default Trainlisting;
