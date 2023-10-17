import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Dashboard from "../component/navBar";
import {
  cancelBooking,
  deleteBooking,
  editBooking,
  getAllBookings,
} from "../services/bookingManagementService";
import "../Assets/Styles/start.css";
import Swal from "sweetalert2";

const Reservationmanagement = () => {
  const [bookings, setBookings] = useState([]);
  // const [cookies, setCookie] = useCookies(["User"]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [bookingNic, setBookingNic] = useState("");
  const [booking, setBooking] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm != "") {
      setBookings(
        bookings.filter((booking) => {
          return booking.nic.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    } else {
      handleGetAllBookings();
    }
  }, [searchTerm]);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllBookings();
    // console.log(bookings.then((res) => console.log(res)));
  }, []);

  const handleGetAllBookings = async () => {
    await getAllBookings().then((res) => {
      console.log(res);
      setBookings(res);
    });
  };

  const handleCancelBooking = async (id, date) => {
    console.log("Date", date);
    const currentDate = new Date();

    const givenDate = new Date(date);

    // Calculate 5 days before the current date
    const fiveDaysAgo = new Date(givenDate);
    fiveDaysAgo.setDate(givenDate.getDate() - 5);
    console.log("Given", givenDate);
    console.log("Five", fiveDaysAgo);
    // Compare the given date with 5 days ago
    if (fiveDaysAgo <= currentDate) {
      // console.log("The given date is at least 5 days before the current date.");
      Swal.fire("You can only cancel a booking 5 days before the journey");
    } else {
      // console.log("The given date is not at least 5 days before the current date.");

      Swal.fire({
        title: "Are you sure you want to cancel?",

        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await cancelBooking(id);
          console.log(response);
          if (response.status == 200) {
            // alert("Booking Cancelled");
            Swal.fire("Booking Cancelled");
            handleGetAllBookings();
          } else {
            // alert("Booking Cancelation Failed");
            Swal.fire("Booking Cancelation Failed", response.data.message);
          }
        }
      });
    }
  };

  const handledeleteBooking = async (id, date) => {
    const currentDate = new Date();

    const givenDate = new Date(date);

    // Calculate 5 days before the current date
    const fiveDaysAgo = new Date(givenDate);
    fiveDaysAgo.setDate(givenDate.getDate() - 5);
    console.log("Given", givenDate);
    console.log("Five", fiveDaysAgo);
    if (fiveDaysAgo <= currentDate) {
      Swal.fire("You can only delete a booking 5 days before the journey");
    } else {
      Swal.fire({
        title: "Are you sure you want to delete?",

        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteBooking(id);
          console.log(response);
          if (response.status == 204) {
            // alert("Booking Deleted");
            Swal.fire("Booking Deleted");
            handleGetAllBookings();
          } else {
            // alert("Booking Deletion Failed");
            Swal.fire("Booking Deletion Failed");
          }
        }
      });
    }
  };

  const handleBookingEdit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...booking,
      nic: bookingNic,
    };
    console.log("bookingData", bookingData);
    const response = await editBooking(booking.id, bookingData);
    console.log("Edit", response);
  };

  const handleChangeTrain = async (e) => {
    e.preventDefault();
    navigate("/searchtrain", {
      state: {
        booking: booking,
      },
    });
  };
  // {
  //   createdDate: "2023-10-15T13:55:38.524Z";
  //   fromStation: "Colombo";
  //   id: "652bef5a4f2463a2dc378e87";
  //   nic: "985645123V";
  //   price: "500";
  //   quentity: "5";
  //   sheduledate: "2023-10-25";
  //   sheduletime: "08:50";
  //   toStation: "Galle";
  //   trainID: "T005";
  //   trainName: "Bangadeniya Express";
  // }
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
                Ticket Reservation Management
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
                        Ticket Reservation Management
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            <Link to="/searchtrain">
              <button
                type="button"
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
                Add Reservation
              </button>
            </Link>
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
                  NIC
                </th>
                <th scope="col" className="px-6 py-3">
                  Passengers
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Station
                </th>
                <th scope="col" className="px-6 py-3">
                  End Station
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <br />
            <tbody>
              {bookings.map((booking, index) => (
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{booking.trainID}</td>
                  <td className="px-6 py-4">{booking.nic}</td>
                  <td className="px-6 py-4">{booking.quentity}</td>
                  <td className="px-6 py-4">{booking.fromStation}</td>
                  <td className="px-6 py-4">{booking.toStation}</td>
                  <td className="px-6 py-4">
                    {booking.sheduledate.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4">
                    LKR {parseFloat(booking.price).toFixed(2)}
                  </td>

                  <td class="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          booking.status === "Reserved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } mr-2`}
                      ></div>
                      {booking.status === "Reserved" ? "Reserved" : "Canceled"}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setFromStation(booking.fromStation);
                        setToStation(booking.toStation);
                        setBookingNic(booking.nic);
                        setBooking(booking);
                        console.log("booking", booking);
                      }}
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <svg
                        class="w-3 h-3 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 8v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0Zm12 7h-1v1a1 1 0 0 1-2 0v-1H8a1 1 0 0 1 0-2h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 0 1 0 2Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleCancelBooking(booking.id, booking.sheduledate);
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
                    <button
                      type="button"
                      onClick={() => {
                        handledeleteBooking(booking.id, booking.sheduledate);
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

          {isEditModalOpen ? (
            <div className="modal-overlay">
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative bg-white rounded-lg">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={() => setIsEditModalOpen(false)}
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
                          Edit Reservation
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
                        <div class="flex items-center space-x-2">
                          <h1 className="font text-2xl text-gray-700">
                            {fromStation}
                          </h1>
                          <svg
                            class="w-5 h-5 text-gray-700 dark:text-gray-700"
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
                          <h1 className="font text-2xl text-gray-700">
                            {toStation}
                          </h1>
                        </div>
                        <p className="font text-0.5 text-gray-500">
                          Date - 2023-10-12
                        </p>
                        <p className="font text-0.5 text-gray-400">
                          {/* {selectedTrainId} | {selectedTrainName} */}
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
                              placeholder="Enter Traveler First Name"
                              required
                              value={bookingNic}
                              onChange={(e) => {
                                setBookingNic(e.target.value);
                                // setFirstName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <button
                          // type="submit"
                          onClick={handleBookingEdit}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Confirm Reservation
                        </button>
                        <button
                          // type="submit"
                          onClick={handleChangeTrain}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Change Train
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

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

export default Reservationmanagement;
