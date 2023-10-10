import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { getAllBookings } from "../services/bookingManagementService";
import Dashboard from "../component/navBar";

const AllReservation = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const bookings = getAllBookings().then((res) => {
      // console.log(res);
      setBookings(res);
    });
    // console.log(bookings.then((res) => console.log(res)));
  }, []);

  return (
    <>
      <div className="w-screen gap-4 h-screen bg-white  flex  ">
        <div className="w-1/6">
          <Dashboard />
        </div>
        <div className="relative overflow-x-auto w-5/6 px-10 pt-20">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-black-200 uppercase bg-blue-100">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {booking.id}
                  </th>
                  <td className="px-6 py-4">{booking.price}</td>
                  <td className="px-6 py-4">{booking.quantity}</td>
                  <td className="px-6 py-4">$2999</td>
                  <td className="px-6 py-4 gap-8 flex">
                    <button className="text-white text-md py-1 px-4 font-semibold bg-[#f52222] w-full rounded-md">
                      Cancel
                    </button>
                    <button className="text-white text-md py-1 px-4 font-semibold bg-[#F5A622] w-full rounded-md">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const CreateReservation = () => {
  const [bookingId, setBookingId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <>
      <div className="h-screen p-0 m-0  justify-center items-center flex">
        <div className="justify-center items-center flex flex-col py-10 h-full  ">
          <div className="gap-10 flex px-10 py-10  justify-center bg-slate-700/20  items-center">
            <form onSubmit="#" className="justify-center   items-center">
              <div className="justify-start items-start flex flex-col w-96  ">
                <label className=" justify-start items-start flex text-lg font-semibold w-full">
                  NIC Number
                </label>
                <input
                  placeholder="name"
                  className="p-3 rounded-md my-3 outline-none text-black w-full"
                />
                <label className=" justify-start items-start flex text-lg font-semibold w-full">
                  Name
                </label>
                <input
                  placeholder="name"
                  className="p-3 rounded-md my-3 outline-none text-black w-full"
                />
                <label className=" justify-start items-start flex text-lg font-semibold w-full">
                  Seats
                </label>
                <input
                  placeholder="name"
                  className="p-3 rounded-md my-3 outline-none text-black w-full"
                />

                <button
                  className="text-white text-xl py-3 bg-[#F5A622] w-full  font-bold rounded-md mt-5"
                  href=""
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReservation;
