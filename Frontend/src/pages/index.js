import { Outlet, Link } from "react-router-dom";

const Homepage = (props) => {
  return (
    <>
    <div className="h-screen w-screen flex p-0 m-0">
      <div className="bg-[#0052A8] h-screen w-1/2 justify-center items-center flex flex-col">
        <h1 className="text-white text-4xl font-bold w-1/2 py-5">
          Neque porro quisquam est qui dolorem ipsum
        </h1>
        <h3 className="text-white text-xl font-thin w-1/2 py-3 ">
          Neque porro quisquam est qui dolorem ipsum
        </h3>
        <div className="w-1/2 justify-start py-5">
          <Link to="/welcome">
            <button
              className="text-white text-xl py-3 bg-[#F5A622] px-8  font-bold rounded-full">
                          

              Get Started
            </button>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default Homepage;
