import { Outlet, Link } from "react-router-dom";
import "../Assets/Styles/start.css";

const Login = (props) => {
  return (
    <div className="login-background">
      <div className="w-screen bg-[] justify-center items-center flex flex-col py-10 h-full  ">
        

        <div className="gap-10 flex px-10 py-10  justify-center bg-slate-900/50  items-center">
        <h1 className="text-5xl  font-bold text-white py-10">Office Login</h1>
          <form
            onSubmit="#"
            className="text-white  justify-center   items-center"
          >
            <div className="justify-start items-start flex flex-col w-96  ">
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Email
              </label>
              <input
                placeholder="Enter Your Email"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
              />
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Password
              </label>
              <input
                placeholder="Enter Your Passeord"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
              />

              <button
                className="text-white text-xl py-3 bg-[#F5A622] w-full  font-bold rounded-md mt-5">
                Sign In
              </button>
              {/* <Link to="/signup">
                <p className="pt-6 underline">create an account</p>
              </Link> */}
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Login;