import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Dashboard from "../component/navBar";
import "../Assets/Styles/start.css";
import {
  createTrainSchedule,
  deleteTrainSchedule,
  editTrainSchedule,
  getAllTrains,
  publishTrainSchedule,
} from "../services/trainManagementService";
import Swal from "sweetalert2";

const Trainmanagement = () => {
  const [isModaltrainaddOpen, setIsModaltrainaddOpen] = useState(false);
  const [isModaltraineditOpen, setIsModaltraineditOpen] = useState(false);
  const [isModalstationsOpen, setIsModalstationsOpen] = useState(false);
  const [trains, settrains] = useState([]);
  const [trainID, settrainID] = useState("");
  const [trainName, settrainName] = useState("");
  const [pricePerKM, setpricePerKm] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [departureTimee, setDepartureTime] = useState("");
  const [arrivalTimee, setArrivalTime] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [stations, setStations] = useState([]);
  const [id, setid] = useState("");
  const [train, setTrain] = useState({});

  const toggleModaltrainadd = () => {
    setIsModaltrainaddOpen(!isModaltrainaddOpen);
  };

  const toggleModaltrainedit = () => {
    setArrivalTime("");
    setDepartureTime("");
    setAvailableSeats("");
    setpricePerKm("");
    settrainName("");
    settrainID("");
    setSections([{ station: "", distanceFromStart: "" }]);
    setIsModaltraineditOpen(!isModaltraineditOpen);
  };

  const toggleModalstations = () => {
    setIsModalstationsOpen(!isModalstationsOpen);
  };

  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  function setMinDate() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date-input").min = today;
  }

  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    ...[
      "Alawwa",
      "Ambalangoda",
      "Anuradhapura",
      "Badulla",
      "Batticaloa",
      "Beliatta",
      "Chilaw",
      "Colombo Fort",
      "Maradana",
      "Dandugama",
      "Dematagoda",
      "Ella",
      "Galle",
      "Gampaha",
      "Haputale",
      "Hikkaduwa",
      "Idalgashinna",
      "Jaffna",
      "Kadugannawa",
      "Kalutara South",
      "Kandy",
      "Katugastota",
      "Kilinochchi",
      "Kollupitiya",
      "Kurunegala",
      "Maharagama",
      "Matale",
      "Matara",
      "Moratuwa",
      "Mount Lavinia",
      "Nanu Oya",
      "Narahenpita",
      "Negombo",
      "Nugegoda",
      "Pannipitiya",
      "Peradeniya",
      "Periyaneelavanai",
      "Polgahawela",
      "Polonnaruwa",
      "Puttalam",
      "Rambukkana",
      "Ratmalana",
      "Ratnapura",
      "Thalaimannar",
      "Trincomalee",
      "Valachchenai",
      "Vavuniya",
    ].map((station) => ({ field1: station })),
  ];
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [sections, setSections] = useState([
    { station: "", distanceFromStart: "" },
  ]);

  const handleAddSection = () => {
    setSections([...sections, { station: "", distanceFromStart: "" }]);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleInputChange = (index, field, value) => {
    const updatedSections = [...sections];
    console.log(updatedSections);
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const getTrains = async () => {
    const res = await getAllTrains();
    if (res.status === 200) {
      settrains(res.data);
      console.log("Trains", res.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    getTrains();
  }, []);

  const createTrain = async (e) => {
    e.preventDefault();

    // const checkDepartureTime = new Date(departureTimee);
    // const checkArrivalTime = new Date(arrivalTimee);

    // console.log("Departure Time", checkDepartureTime);
    // console.log("Arrival Time", departureTimee == arrivalTimee);

    if (
      trainID === "" ||
      trainName === "" ||
      availableSeats === "" ||
      pricePerKM === "" ||
      departureTimee === "" ||
      arrivalTimee === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
    } else if (departureTimee > arrivalTimee) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Arrival time should be greater than Departure time!",
      });
    } else if (departureTimee == arrivalTimee) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Arrival time and Departure time cannot be same!",
      });
    } else if (sections.length <= 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add stations!",
      });
    } else {
      const departureTime = new Date(departureTimee).toISOString().toString();
      console.log("Departure Time", departureTime);
      const arrivalTime = new Date(arrivalTimee).toISOString().toString();
      console.log("Arrival Time", arrivalTime);
      console.log("Sections", sections);
      const data = {
        id: "string",
        trainID,
        trainName,
        availableSeats,
        pricePerKM,
        pricePerTicket: 0,
        schedule: {
          departureTime,
          arrivalTime,
          stationDistances: sections,
        },
        status: "string",
        reservations: [],
      };
      console.log("Data", data);
      const res = await createTrainSchedule(data);
      console.log("Response", res);
      if (res != undefined && res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Train Schedule Created Successfully",
        });
        setArrivalTime("");
        setDepartureTime("");
        setAvailableSeats("");
        setpricePerKm("");
        settrainName("");
        settrainID("");
        setSections([{ station: "", distanceFromStart: "" }]);
        setIsModaltrainaddOpen(false);
        getTrains();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  const handleTrainPublish = async (id) => {
    const response = await publishTrainSchedule(id);
    console.log("Publish", response);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Train Schedule Published Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleTrainScheduleEdit = async () => {
    const departureTime = new Date(departureTimee).toISOString().toString();
    console.log("Departure Time", departureTime);
    const arrivalTime = new Date(arrivalTimee).toISOString().toString();
    console.log("Arrival Time", arrivalTime);
    const data = {
      ...train,
      id: id,
      trainID,
      trainName,
      availableSeats,
      pricePerKM,
      pricePerTicket: 0,
      schedule: {
        departureTime,
        arrivalTime,
        stationDistances: sections,
      },
    };

    console.log("Data sending", data);
    const response = await editTrainSchedule(id, data);

    if (response.status === 200) {
      setIsModaltraineditOpen(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Train Schedule Edited Successfully",
      });
      getTrains();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleTrainDelete = async (id, reservations) => {
    if (reservations.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Train Schedule Cannot be deleted due to reservations",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteTrainSchedule(id);
          console.log("Delete", res);
          if (res.status === 204) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Train Schedule Deleted Successfully",
            });
            getTrains();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
    }
  };

  function formatDate(inputDate) {
    const originalDate = new Date(inputDate); // Parse the original date string
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, so add 1
    const day = originalDate.getDate().toString().padStart(2, "0");
    const hours = originalDate.getUTCHours().toString().padStart(2, "0");
    const minutes = originalDate.getUTCMinutes().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDate;
  }
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
                Train Schedule Management
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
                        Train Schedule Management
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
          <div class="flex items-center space-x-2">
            <div class="relative mt-1 flex items-center">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-50"
                placeholder="Search reservations"
              />
            </div>
            <button
              type="button"
              onClick={toggleModaltrainadd}
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
              class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-3 h-3 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
              </svg>
              Add Schedule
            </button>
          </div>
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
              {trains.map((train, index) => (
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
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
                  <td class="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          train.status === "available"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } mr-2`}
                      ></div>
                      {train.status === "available"
                        ? "Published"
                        : "Unpublished"}
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
                        console.log("Train", train);
                        setIsModaltraineditOpen(true);
                        setSections(train.schedule.stationDistances);
                        settrainID(train.trainID);
                        setid(train.id);
                        setTrain(train);
                        settrainName(train.trainName);
                        setAvailableSeats(train.availableSeats);
                        setpricePerKm(train.pricePerKM);
                        const getDepTime = formatDate(
                          train.schedule.departureTime
                        );
                        setDepartureTime(getDepTime);
                        const getArrTime = formatDate(
                          train.schedule.arrivalTime
                        );
                        // console.log("Departure", train.schedule.departureTime);
                        setArrivalTime(getArrTime);
                      }}
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <svg
                        class="w-3 h-3 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTrainPublish(train.id)}
                      class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:focus:ring-red-900"
                    >
                      <svg
                        class="w-3 h-3 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleTrainDelete(train.id, train.reservations);
                        // console.log("Trians", train.reservations);
                      }}
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      <svg
                        class="w-3 h-3 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* train add modal */}
          {isModaltrainaddOpen && (
            <div className="modal-overlay">
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative bg-white rounded-lg">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={toggleModaltrainadd}
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
                          Create Train Schedule
                        </h1>
                      </center>
                      <br />
                      <form className="space-y-3 ">
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Train ID
                            </label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              placeholder="Enter Train ID"
                              required
                              onChange={(e) => {
                                settrainID(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Train Name
                            </label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              placeholder="Enter Train Name"
                              required
                              onChange={(e) => {
                                settrainName(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Available Seats
                            </label>
                            <input
                              type="number"
                              min="0"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              placeholder="Enter Available Seats"
                              required
                              onChange={(e) => {
                                setAvailableSeats(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Start Time
                            </label>
                            <input
                              type="datetime-local"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              onChange={(e) => {
                                setDepartureTime(e.target.value);
                                console.log(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              End Time
                            </label>
                            <input
                              type="datetime-local"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              onChange={(e) => {
                                setArrivalTime(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Price Per KM
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              type="number"
                              placeholder="Enter Price Per KM"
                              onChange={(e) => {
                                setpricePerKm(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="w-full">
                          {sections.map((section, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-white rounded-lg p-4 shadow mb-4 w-full"
                            >
                              <div className="flex-1 mr-4">
                                <label
                                  htmlFor={`station-${index}`}
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                                >
                                  Station
                                </label>
                                <select
                                  id={`station-${index}`}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                                  value={section.station}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "station",
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  <option value="" disabled>
                                    Select a Station
                                  </option>
                                  {options.map((option) => (
                                    <option
                                      key={option.field1}
                                      value={option.field1}
                                    >
                                      {option.field1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex-1 mr-4">
                                <label
                                  htmlFor={`distance-${index}`}
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                                >
                                  Distance
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  id={`distance-${index}`}
                                  placeholder="Enter Distance From Start Station"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                                  value={section.distance}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "distanceFromStart",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </div>

                              <button
                                onClick={() => handleRemoveSection(index)}
                                type="button"
                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              >
                                <svg
                                  class="w-3 h-3 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={handleAddSection}
                            class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
                          >
                            Add More Stations
                          </button>
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="toggle"
                            className="mr-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            {isActive ? "Activate" : "Deactivate"}
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="toggle"
                              className="sr-only"
                              onChange={handleToggle}
                              checked={isActive}
                            />
                            <label
                              htmlFor="toggle"
                              className={`${
                                isActive ? "bg-blue-600" : "bg-gray-300"
                              } relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isActive
                                  ? "focus:ring-blue-400"
                                  : "focus:ring-gray-400"
                              }`}
                            >
                              <span
                                className={`${
                                  isActive ? "translate-x-5" : "translate-x-1"
                                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                              />
                            </label>
                          </div>
                        </div>
                        <br />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            createTrain(e);
                          }}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Create Schedule
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* train edit modal */}
          {isModaltraineditOpen && (
            <div className="modal-overlay">
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative bg-white rounded-lg">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={toggleModaltrainedit}
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
                          Edit Train Schedule
                        </h1>
                      </center>
                      <br />
                      <form className="space-y-3 ">
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Train ID
                            </label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              placeholder="Enter Train ID"
                              required
                              value={trainID}
                              onChange={(e) => {
                                settrainID(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Train Name
                            </label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              placeholder="Enter Train Name"
                              required
                              value={trainName}
                              onChange={(e) => {
                                settrainName(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Available Seats
                            </label>
                            <input
                              type="number"
                              min="0"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              placeholder="Enter Available Seats"
                              required
                              value={availableSeats}
                              onChange={(e) => {
                                setAvailableSeats(e.target.value);
                              }}
                            />
                          </div>
                          {/* <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Schedule Date
                            </label>
                            <input
                              type="date"
                              id="date-input"
                              defaultValue={scheduleDate}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              onFocus={setMinDate}
                              required
                              onChange={(e) => {
                                setScheduleDate(e.target.value);
                              }}
                            />
                          </div> */}
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Start Time
                            </label>
                            <input
                              type="datetime-local"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              defaultValue={departureTimee}
                              onChange={(e) => {
                                setDepartureTime(e.target.value);
                                console.log(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              End Time
                            </label>
                            <input
                              type="datetime-local"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              defaultValue={arrivalTimee}
                              onChange={(e) => {
                                setArrivalTime(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Price Per KM
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              value={pricePerKM}
                              onChange={(e) => {
                                setpricePerKm(e.target.value);
                              }}
                            />
                          </div>
                          {/* <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                            >
                              Price Per Ticket
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                              required
                              onChange={(e)=>{
                                setpricePerKm(e.target.value);
                              }}
                            />
                          </div> */}
                        </div>

                        <div className="w-full">
                          {sections.map(
                            (section, index) => (
                              console.log(section.station),
                              (
                                <div
                                  key={index}
                                  className="flex items-center bg-white rounded-lg p-4 shadow mb-4 w-full"
                                >
                                  <div className="flex-1 mr-4">
                                    <label
                                      htmlFor={`station-${index}`}
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                                    >
                                      Station
                                    </label>
                                    <select
                                      id={`station-${index}`}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                                      value={section.station}
                                      defaultValue={section.station}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          "station",
                                          e.target.value
                                        )
                                      }
                                      required
                                    >
                                      <option value={section.station} disabled>
                                        {section.station}
                                      </option>
                                      {options.map((option) => (
                                        <option
                                          key={option.field1}
                                          value={option.field1}
                                        >
                                          {option.field1}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex-1 mr-4">
                                    <label
                                      htmlFor={`distance-${index}`}
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                                    >
                                      Distance
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.50"
                                      id={`distance-${index}`}
                                      placeholder="Enter Distance From Start Station"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                                      value={section.distanceFromStart}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          "distanceFromStart",
                                          e.target.value
                                        )
                                      }
                                      required
                                    />
                                  </div>

                                  <button
                                    onClick={() => handleRemoveSection(index)}
                                    type="button"
                                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                  >
                                    <svg
                                      class="w-3 h-3 text-gray-800 dark:text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                    </svg>
                                  </button>
                                </div>
                              )
                            )
                          )}
                          <button
                            type="button"
                            onClick={handleAddSection}
                            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                          >
                            Add More Stations
                          </button>
                        </div>
                        {/* <div className="flex items-center">
                          <label
                            htmlFor="toggle"
                            className="mr-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            {isActive ? "Activate" : "Deactivate"}
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="toggle"
                              className="sr-only"
                              onChange={handleToggle}
                              checked={isActive}
                            />
                            <label
                              htmlFor="toggle"
                              className={`${
                                isActive ? "bg-blue-600" : "bg-gray-300"
                              } relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isActive
                                  ? "focus:ring-blue-400"
                                  : "focus:ring-gray-400"
                              }`}
                            >
                              <span
                                className={`${
                                  isActive ? "translate-x-5" : "translate-x-1"
                                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                              />
                            </label>
                          </div>
                        </div> */}
                        <br />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            // createTrain(e);
                            handleTrainScheduleEdit();
                          }}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Update Schedule
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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

export default Trainmanagement;
