import { useState } from "react";
import { isValidEmail, isValidPhoneNumber } from "../utils/validations";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createTravelAgentAccount } from "../services/travelAgentManagementService";
function Travelagentsignup() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // check if all the use states are not null
    // if not null then call the api
    // else show error message
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      phone,
      email,
      password,
    };
    console.log("Data", data);
    if (!firstName || !lastName || !phone || !email || !password) {
      // alert("Please fill in all the fields");
      Swal.fire("Please fill in all the fields");
    } else if (!isValidEmail(email)) {
      Swal.fire("Please enter a valid email");
    } else if (!isValidPhoneNumber(phone)) {
      Swal.fire("Please enter a valid phone number");
    } else {
      const data = {
        firstName,
        lastName,
        phone,
        email,
        password,
      };

      console.log("Sending", data);

      const response = await createTravelAgentAccount(data);
      console.log("Response", response);
      if (response != false) {
        Swal.fire("Account Created Successfully");
        navigate("/travelagentlogin");
      } else {
        Swal.fire("Error Creating Account");
      }
    }
  };
  return (
    <div className="h-screen w-screen p-0 m-0  justify-center items-center flex ">
      <div className="w-screen bg-[#0052A8] justify-center items-center flex flex-col py-10 h-full  ">
        <h1 className="text-5xl  font-bold text-white py-10">Agent Sign Up</h1>

        <div className="gap-10 flex px-10 py-10  justify-center bg-slate-700/20  items-center">
          <form className="text-white  justify-center   items-center">
            <div className="justify-start items-start flex flex-col w-96  ">
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                First Name
              </label>
              <input
                placeholder="Enter Your First Name"
                type="text"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Last Name
              </label>
              <input
                placeholder="Enter Your Last Name"
                type="text"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Phone Number
              </label>
              <input
                placeholder="Enter Your Phone"
                type="tel"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Email
              </label>
              <input
                placeholder="Enter Your Email"
                type="email"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Password
              </label>
              <input
                placeholder="Enter Your Password"
                type="password"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="text-white text-xl py-3 bg-[#F5A622] w-full  font-bold rounded-md mt-5"
                href=""
                onClick={handleSubmit}
              >
                Sign Up
              </button>

              <Link to="/travelagentlogin">
                <p className="pt-6 ">
                  Already have an account?
                  <span className="underline px-2 font-semibold">
                    Sign In here
                  </span>
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Travelagentsignup;
