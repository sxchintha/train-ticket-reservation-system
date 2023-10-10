import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/index";
import Welcome from "./pages/welcome";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AllTrains from "./pages/allTrains";
import { useEffect } from "react";
import { useIsAuthenticated } from "./utils/auth";
import { Cookies, useCookies } from "react-cookie";
import Selectmanagement from "./pages/selectmanagement";
import Usermanagement from "./pages/usermanagement";

function PrivateRoute({ element }) {
  const [cookies] = useCookies(["User"]);

  // Check if the user is authenticated (you can define this function based on your logic)
  const isAuthenticated = cookies.User !== undefined;

  // If the user is authenticated, render the element, otherwise, redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  const [cookies] = useCookies(["User"]);
  console.log("Cookieeeeeeeeeeee", cookies.User);
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/selectmanagement" element={<Selectmanagement />} />
      <Route exact path="/welcome" element={<Welcome />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
      />
      <Route
        path="/allTrains"
        element={<PrivateRoute element={<AllTrains />} />}
      />
      <Route
        path="/usermanagement"
        element={<PrivateRoute element={<Usermanagement />} />}
      />
      <Route path="/login" element={<Login />} />
      {/* <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/allTrains" element={<AllTrains />} /> */}
    </Routes>
  );
}

export default App;
