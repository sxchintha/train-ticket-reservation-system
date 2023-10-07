import { Outlet, Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="h-screen w-screen p-0 m-0  justify-center items-center flex">
      <div className="w-screen bg-[#0052A8] justify-center items-center flex flex-col py-10 h-full  ">
        <h1 className="text-5xl  font-bold text-white py-10">Office Signup</h1>

        <div className="gap-10 flex px-10 py-10  justify-center bg-slate-700/20  items-center">
          <form
            onSubmit="#"
            className="text-white  justify-center   items-center"
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
                Signup
              </button>
              
              <Link to="/login">
                <p className="pt-6 ">
                  Already have an account?
                  <span className="underline px-2 font-semibold">Login</span>
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

export default SignUp;
