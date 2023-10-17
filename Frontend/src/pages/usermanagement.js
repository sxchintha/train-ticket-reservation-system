import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Dashboard from "../component/navBar";
import {
  createTravelerAccount,
  deactivateTravelerAccount,
  deleteTravelerAccount,
  editTravelerAccount,
  getAllTravelers,
} from "../services/travelerManagementService";
import Swal from "sweetalert2";
import { isValidEmail, isValidPhoneNumber } from "../utils/validations";
import DeleteModel from "../component/deleteModel";
import { useCookies } from "react-cookie";

const Usermanagement = () => {
  const [isModaluseraddOpen, setIsModaluseraddOpen] = useState(false);
  const [isModalusereditOpen, setIsModalusereditOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [nic, setNic] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);
  const [cookies] = useCookies(["User"]);

  const toggleModaluseradd = () => {
    setIsModaluseraddOpen(!isModaluseraddOpen);
    setFirstName(null);
    setLastName(null);
    setNic(null);
    setEmail(null);
    setPhoneNumber(null);
  };

  const toggleModaluseredit = () => {
    setIsModalusereditOpen(!isModalusereditOpen);
    setFirstName(null);
    setLastName(null);
    setNic(null);
    setEmail(null);
    setPhoneNumber(null);
  };

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    getAllTravelers().then((res) => {
      console.log(res);
      setUsers(res);
    });
  };

  // function to create the travelers account
  const createTraveler = async (e) => {
    e.preventDefault();
    const data = {
      nic,
      firstName,
      lastName,
      email,
      phone,
      password,
    };
    if (!firstName || !lastName || !phone || !email || !password) {
      // alert("Please fill in all the fields");
      Swal.fire("Please fill in all the fields");
    } else if (!isValidEmail(email)) {
      Swal.fire("Please enter a valid email");
    } else if (!isValidPhoneNumber(phone)) {
      Swal.fire("Please enter a valid phone number");
    } else {
      const data = {
        nic,
        firstName,
        lastName,
        email,
        phone,
        password,
      };

      console.log("Sending", data);

      const response = await createTravelerAccount(data);

      if (response == 201) {
        Swal.fire("Account Created Successfully");
        // setIsModaluseraddOpen(false);
        toggleModaluseradd();
        getAll();
      } else {
        Swal.fire("Error Creating Account");
      }

      // All validations passed, call the API
    }
  };

  // function to delete the travelers account
  const deleteTraveler = async (e, id) => {
    // e.preventDefault();

    // if (response == 201) {

    const response = await deleteTravelerAccount(id);
    console.log("Reess", response);
    if (response == 204) {
      Swal.fire("Account Deleted Successfully");
      getAll();
    } else {
      Swal.fire("Error Deleting Account");
    }

    // }
  };

  // function to edit the travelers account
  const editTraveler = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      phone,
      email,
      nic,
      password,
    };

    if (!firstName || !lastName || !phone || !email || !password) {
      // alert("Please fill in all the fields");
      Swal.fire("Please fill in all the fields");
    } else if (!isValidEmail(email)) {
      Swal.fire("Please enter a valid email");
    } else if (!isValidPhoneNumber(phone)) {
      Swal.fire("Please enter a valid phone number");
    } else {
      const response = await editTravelerAccount(nic, data);

      console.log("Reess", response);
      if (response == 200) {
        Swal.fire("Account Updated Successfully");
        getAll();
        toggleModaluseredit();
        // getAll();
      } else {
        Swal.fire("Error Editing Account");
      }
    }

    // console.log("Reess", response);
    // if (response == 200) {

    // } else {
    // }
  };

  // function to handle activate and deactivate user account
  const handleDeactivateTravelerAccount = async (e) => {
    e.preventDefault();
    const response = await deactivateTravelerAccount(nic);
    console.log("Reessss", response);
    if (response == 200) {
      Swal.fire("Account Modified Successfully");
      getAll();
      setNic(null);
      setIsDeleteModelOpen(false);
    } else {
      Swal.fire("Error Deactivating Account");
      setNic(null);
      setIsDeleteModelOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDeleteModelOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm != "") {
      setUsers(
        users.filter((user) => {
          return user.nic.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    } else {
      getAll();
    }
  }, [searchTerm]);

  return (
    <>
      <div className="w-screen gap-4 h-screen bg-white  flex  ">
        {isDeleteModelOpen ? (
          <DeleteModel
            confirm={handleDeactivateTravelerAccount}
            cance={handleCancel}
            status={status}
          />
        ) : null}
        <div className="w-1/6">
          <Dashboard />
        </div>
        <div className="relative overflow-x-auto w-5/6 px-10 pt-20">
          <div className="text-center">
            <div className="mx-auto border border-gray-500 p-4 rounded-lg">
              <h1 className="font-bold text-4xl text-gray-700">
                Traveler Management
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
                        Traveler Management
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
                placeholder="Search travelers"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={toggleModaluseradd}
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
              Add Traveler
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
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  NIC
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <br />
            <tbody>
              {users.map((user, index) => (
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.firstName}</td>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">{user.nic}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td class="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          user.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } mr-2`}
                      ></div>
                      {user.status === "active" ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="px-6 py-4 gap-0 flex">
                    <button
                      type="button"
                      onClick={() => {
                        setFirstName(user.firstName);
                        setLastName(user.lastName);
                        setNic(user.nic);
                        setEmail(user.email);
                        setPhoneNumber(user.phone);
                        setPassword(user.password);

                        setIsModalusereditOpen(true);
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
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1.391 7.361.707-3.535a3 3 0 0 1 .82-1.533L7.929 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h4.259a2.975 2.975 0 0 1-.15-1.639ZM8.05 17.95a1 1 0 0 1-.981-1.2l.708-3.536a1 1 0 0 1 .274-.511l6.363-6.364a3.007 3.007 0 0 1 4.243 0 3.007 3.007 0 0 1 0 4.243l-6.365 6.363a1 1 0 0 1-.511.274l-3.536.708a1.07 1.07 0 0 1-.195.023Z" />
                      </svg>
                    </button>
                    {/*
                      only the backofficer has the access to deactivate or activate the user account, the login cookie is used to validate
                      the user role
                      */}
                    {cookies.User?.userRole === "officer" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsDeleteModelOpen(true);
                          setNic(user.nic);
                          setStatus(user.status);
                        }}
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
                    ) : null}

                    <button
                      type="button"
                      onClick={(e) => deleteTraveler(e, user.nic)}
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

          {/* create modal */}
          {isModaluseraddOpen && (
            <div className="modal-overlay">
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative bg-white rounded-lg">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={toggleModaluseradd}
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
                          Create Traveler Account
                        </h1>
                      </center>
                      <br />
                      <form className="space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's First Name"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's Last Name"
                            required
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
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
                            placeholder="Enter Traveler's NIC"
                            required
                            onChange={(e) => setNic(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's Phone"
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            Your password
                          </label>
                          <input
                            type="password"
                            placeholder="Enter Password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={(e) => createTraveler(e)}
                        >
                          Create Account
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit modal */}
          {isModalusereditOpen && (
            <div className="modal-overlay">
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative bg-white rounded-lg">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={toggleModaluseredit}
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
                          Edit Traveler Account
                        </h1>
                      </center>
                      <br />
                      <form className="space-y-6" action="#">
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's First Name"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's Last Name"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            NIC
                          </label>
                          <input
                            type="text"
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's NIC"
                            required
                            value={nic}
                            disabled
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-dark"
                            placeholder="Enter Traveler's Phone"
                            required
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <button
                          type="submit"
                          onClick={(e) => {
                            editTraveler(e);
                          }}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Update Account
                        </button>
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

export default Usermanagement;
