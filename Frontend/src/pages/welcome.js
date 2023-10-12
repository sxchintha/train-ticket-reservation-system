import { Outlet, Link } from "react-router-dom";
import "../Assets/Styles/start.css";

function Welcome() {
  return (
    <div className="background-container">
      <div className="w-4/5 bg-[#0052A8] justify-center items-center flex flex-col py-10 h-3/5  rounded-3xl">
        <h1 className="text-5xl  font-bold text-white">Select your Role</h1>
        <div className="gap-10 flex py-20">
          <Link to="/travelagentlogin">
            <button className="py-10 font-semibold w-60 bg-[#0052A8] hover:text-white text-3xl hover:border-white border-yellow-500 hover:border-4 border-4 rounded-xl text-yellow-400  duration-300  ">
              Travel Agent
            </button>
          </Link>

          <Link to="/backOfficerLogin">
            <button className="py-10 w-60 font-semibold bg-[#0052A8] hover:text-white text-3xl hover:border-white border-yellow-500 hover:border-4 border-4 rounded-xl text-yellow-400 duration-300  ">
              Back Office
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
