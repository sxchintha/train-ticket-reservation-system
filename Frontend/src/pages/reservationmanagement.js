import { useState } from "react"
import { Outlet, Link } from "react-router-dom";
import Dashboard from "../component/navBar";
import DeleteModel from "../component/deleteModel";

const Reservationmanagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <div className="w-screen gap-4 h-screen bg-white  flex  ">
      {isModalOpen && <DeleteModel confirm={() => setIsModalOpen(false)} />}
        <div className="w-1/6">
          <Dashboard />
        </div>
        <div className="relative overflow-x-auto w-5/6 px-10 pt-20">
        <div className="text-center">
    <div className="mx-auto border border-gray-500 p-4 rounded-lg">
        <h1 className="font-bold text-4xl text-gray-700">Ticket Reservation Management</h1>
    <br/>

            <nav class="flex justify-center" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                <Link to="/selectmanagement">
                <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-dark">
                    <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    Home
                </a>
                </Link>
                </li>
                <li aria-current="page">
                <div class="flex items-center">
                    <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Ticket Reservation Management</span>
                </div>
                </li>
            </ol>
            </nav>

    </div>
</div>
<br/>
        <div class="flex items-center space-x-2">
    <div class="relative mt-1 flex items-center">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-50" placeholder="Search reservations"/>
    </div>
        <button type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
            </svg>
        Add Reservation
        </button>
    </div>



        <br/>
        
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
                  Depature Date
                </th>
                <th scope="col" className="px-6 py-3">
                  No of Passengers
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Station
                </th>
                <th scope="col" className="px-6 py-3">
                  End Station
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <br/>
            <tbody>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        01
                    </th>
                    <td className="px-6 py-4">
                        8057
                    </td>
                    <td className="px-6 py-4">
                        Ruhunu Kumari
                    </td>
                    <td className="px-6 py-4">
                        2023.10.12
                    </td>
                    <td className="px-6 py-4">
                        02
                    </td>
                    <td className="px-6 py-4">
                        Galle
                    </td>
                    <td className="px-6 py-4">
                        Colombo Fort
                    </td>
                    <td className="px-6 py-4">
                        LKR 600.00
                    </td>
                    <td className="px-6 py-4 gap-2 flex">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                    </svg>
                    </button>
                    </td>
                </tr>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        02
                    </th>
                    <td className="px-6 py-4">
                        8057
                    </td>
                    <td className="px-6 py-4">
                        Ruhunu Kumari
                    </td>
                    <td className="px-6 py-4">
                        2023.10.12
                    </td>
                    <td className="px-6 py-4">
                        02
                    </td>
                    <td className="px-6 py-4">
                        Galle
                    </td>
                    <td className="px-6 py-4">
                        Colombo Fort
                    </td>
                    <td className="px-6 py-4">
                        LKR 600.00
                    </td>
                    <td className="px-6 py-4 gap-2 flex">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                    </svg>
                    </button>
                    </td>
                </tr>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        03
                    </th>
                    <td className="px-6 py-4">
                        8057
                    </td>
                    <td className="px-6 py-4">
                        Ruhunu Kumari
                    </td>
                    <td className="px-6 py-4">
                        2023.10.12
                    </td>
                    <td className="px-6 py-4">
                        02
                    </td>
                    <td className="px-6 py-4">
                        Galle
                    </td>
                    <td className="px-6 py-4">
                        Colombo Fort
                    </td>
                    <td className="px-6 py-4">
                        LKR 600.00
                    </td>
                    <td className="px-6 py-4 gap-2 flex">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                    </svg>
                    </button>
                    </td>
                </tr>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        04
                    </th>
                    <td className="px-6 py-4">
                        8057
                    </td>
                    <td className="px-6 py-4">
                        Ruhunu Kumari
                    </td>
                    <td className="px-6 py-4">
                        2023.10.12
                    </td>
                    <td className="px-6 py-4">
                        02
                    </td>
                    <td className="px-6 py-4">
                        Galle
                    </td>
                    <td className="px-6 py-4">
                        Colombo Fort
                    </td>
                    <td className="px-6 py-4">
                        LKR 600.00
                    </td>
                    <td className="px-6 py-4 gap-2 flex">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                    </svg>
                    </button>
                    </td>
                </tr>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        05
                    </th>
                    <td className="px-6 py-4">
                        8057
                    </td>
                    <td className="px-6 py-4">
                        Ruhunu Kumari
                    </td>
                    <td className="px-6 py-4">
                        2023.10.12
                    </td>
                    <td className="px-6 py-4">
                        02
                    </td>
                    <td className="px-6 py-4">
                        Galle
                    </td>
                    <td className="px-6 py-4">
                        Colombo Fort
                    </td>
                    <td className="px-6 py-4">
                        LKR 600.00
                    </td>
                    <td className="px-6 py-4 gap-2 flex">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                    </svg>
                    </button>
                    </td>
                </tr>
                
            </tbody>
          </table>
         
                <div id="popup-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-6 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Yes, I'm sure
                                </button>
                                <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
<footer class="bg-white rounded-lg dark: m-8">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-10">
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 TRACLIN. All Rights Reserved.</span>
    </div>
</footer>
        </div>
      </div>
    </>
  );
};

export default Reservationmanagement;
