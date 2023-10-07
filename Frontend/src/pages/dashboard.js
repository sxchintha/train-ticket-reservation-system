import { useState } from "react"
import { Outlet, Link } from "react-router-dom";

const allReservation = () => {


  return (
    <>
      <div className="relative overflow-x-auto">
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
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">
                        Silver
                    </td>
                    <td className="px-6 py-4">
                        Laptop
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                    <td className="px-6 py-4 gap-8 flex">
                        <button className="text-white text-md py-1 px-4 font-semibold bg-[#f52222] w-full rounded-md">Cancel</button>
                        <button className="text-white text-md py-1 px-4 font-semibold bg-[#F5A622] w-full rounded-md">Update</button>
                    </td>
                </tr>
                <tr className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        Microsoft Surface Pro
                    </th>
                    <td className="px-6 py-4">
                        White
                    </td>
                    <td className="px-6 py-4">
                        Laptop PC
                    </td>
                    <td className="px-6 py-4">
                        $1999
                    </td>
                    <td className="px-6 py-4 gap-8 flex">
                        <button className="text-white text-md py-1 px-4 font-semibold bg-[#f52222] w-full rounded-md">Cancel</button>
                        <button className="text-white text-md py-1 px-4 font-semibold bg-[#F5A622] w-full rounded-md">Update</button>
                    </td>
                </tr>
                <tr className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        Magic Mouse 2
                    </th>
                    <td className="px-6 py-4">
                        Black
                    </td>
                    <td className="px-6 py-4">
                        Accessories
                    </td>
                    <td className="px-6 py-4">
                        $99
                    </td>
                    <td className="px-6 py-4 gap-8 flex">
                        <button className="text-white text-md py-1 px-4 font-semibold bg-[#f52222] w-full rounded-md">Cancel</button>
                        <button className="text-white text-md py-1 px-4 font-semibold bg-[#F5A622] w-full rounded-md">Update</button>
                    </td>
                </tr>
            </tbody>
        </table>


  </div>

    </>
  )


}

const createReservation = () => {

  return (
    <>
      <div className="h-screen p-0 m-0  justify-center items-center flex">
      <div className="justify-center items-center flex flex-col py-10 h-full  ">

        <div className="gap-10 flex px-10 py-10  justify-center bg-slate-700/20  items-center">
          <form
            onSubmit="#"
            className="justify-center   items-center"
          >
            <div className="justify-start items-start flex flex-col w-96  ">
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Name
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
                Name
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
  )

}

const Dashboard = (props) => {

  const [componentState, setComponentState] = useState('reservation');


  const toggleMenu = (keyword) =>{

    if(keyword === "reservation"){
      // render ALl
      setComponentState('reservation')
    }else{
      // create
      setComponentState('create')
    }

  }
  

  return (
    <div className="h-screen w-screen p-0 m-0  justify-center items-center flex">
      <div className="w-1/6 bg-[#0052A8] justify-start items-startflex flex-col py-10 h-full ">
        <div className="text-white w-full">
          <h1 className="text-white text-3xl font-medium  px-5">
            Ticket Reservation
          </h1>
          <ul className="py-10 gap-10 s  font-medium">
            <li className="hover:bg-yellow-500 px-5 py-2 w-full duration-300" onClick={()=>toggleMenu('reservation')}>
              All Reservation
            </li>
            <li className="hover:bg-yellow-500 px-5 py-2 duration-300" onClick={()=>toggleMenu('create')}>
              Create Reservation
            </li>
          </ul>
        </div>
      </div>
      <div className="w-5/6 bg-white justify-center items-center flex flex-col py-10 h-full  ">

        { componentState == "reservation" ? allReservation() : createReservation() }

      </div>
    </div>
  );
}

export default Dashboard;
