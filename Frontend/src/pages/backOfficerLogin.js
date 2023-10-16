import { Outlet, Link } from "react-router-dom";
import "../Assets/Styles/start.css";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Swal from "sweetalert2";
import { isValidEmail } from "../utils/validations";
import { backOfficerLogin } from "../services/userManagementServices";
import { useNavigate } from "react-router-dom";
const BackOfficerLogin = (props) => {
  const [cookies, setCookie] = useCookies(["User"]);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    // check if all the use states are not null
    // if not null then call the api
    // else show error message
    e.preventDefault();
    const data = {
      email,
      password,
    };
    console.log("Data", data);
    if (!email || !password) {
      // alert("Please fill in all the fields");
      Swal.fire("Please fill in all the fields");
    } else if (!isValidEmail(email)) {
      Swal.fire("Please enter a valid email");
    } else {
      const data = {
        email,
        password,
      };

      console.log("Sending", data);

      const response = await backOfficerLogin(data);

      if (response != false) {
        // navigate to dashboard
        setCookie("User", {
          userRole: "officer",
        });
        navigate("/selectmanagement");
        // props.history.push("/dashboard");
      } else {
        Swal.fire("Error Signin Account");
      }

      // All validations passed, call the API
    }
  };

  return (
    <div className="login-background">
      <div className="w-screen bg-[] justify-center items-center flex flex-col py-10 h-full  ">
        <div
          className="gap-10 flex px-10 py-10  justify-center bg-slate-600 rounded-lg  items-center"
          style={{ backgroundColor: "rgb(0 82 168 / var(--tw-bg-opacity))" }}
        >
          <h1 className="text-5xl  font-bold text-white py-10">
            Office Sign In
          </h1>
          <form
            className="text-white  justify-center   items-center"
          >
            <div className="justify-start items-start flex flex-col w-96  ">
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Email
              </label>
              <input
                placeholder="Enter Your Email"
                type="email"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className=" justify-start items-start flex text-lg font-semibold w-full">
                Password
              </label>
              <input
                placeholder="Enter Your Passeord"
                type="password"
                className="p-3 rounded-md my-3 outline-none text-black w-full"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={(e) => {
                  handleSubmit(e);
                  // e.preventDefault();
                  // setCookie("User", {
                  //   userRole: "admin",
                  // });
                }}
                className="text-white text-xl py-3 bg-[#F5A622] w-full  font-bold rounded-md mt-5"
              >
                Sign In
              </button>
              <Link to="/backOfficerSignup">
                <p className="pt-6 ">
                  Don't have an account?
                  <span className="underline px-2 font-semibold">
                    Sign Up here
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
};

export default BackOfficerLogin;
