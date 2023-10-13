import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/index";
import Welcome from "./pages/welcome";
import { useEffect } from "react";
import { useIsAuthenticated } from "./utils/auth";
import { Cookies, useCookies } from "react-cookie";
import Selectmanagement from "./pages/selectmanagement";
import Usermanagement from "./pages/usermanagement";
import Reservationmanagement from "./pages/reservationmanagement";
import BackOfficerSignUp from "./pages/backOfficerSignup";
import BackOfficerLogin from "./pages/backOfficerLogin";
import Travelagentlogin from "./pages/travelagentlogin";
import Travelagentsignup from "./pages/travelagentsignup";
import Trainmanagement from "./pages/trainmanagement";
import Searchtrain from "./pages/searchtrain";
import Trainlisting from "./pages/trainlisting";

function PrivateRoute({ element }) {
  const [cookies] = useCookies(["User"]);

  // Check if the user is authenticated (you can define this function based on your logic)
  const isAuthenticated = cookies.User !== undefined;

  // If the user is authenticated, render the element, otherwise, redirect to login
  return isAuthenticated ? element : <Navigate to="/backOfficerLogin" />;
}

function App() {
  const [cookies] = useCookies(["User"]);
  console.log("Cookieeeeeeeeeeee", cookies.User);
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/backOfficerSignup" element={<BackOfficerSignUp />} />
      <Route exact path="/travelagentsignup" element={<Travelagentsignup />} />
      <Route exact path="/selectmanagement" element={<Selectmanagement />} />
      <Route exact path="/welcome" element={<Welcome />} />
      <Route
        path="/usermanagement"
        element={<PrivateRoute element={<Usermanagement />} />}
      />
      <Route
        path="/reservationmanagement"
        element={<PrivateRoute element={<Reservationmanagement />} />}
      />
      <Route
        path="/trainmanagement"
        element={<PrivateRoute element={<Trainmanagement />} />}
      />
      <Route
        path="/searchtrain"
        element={<PrivateRoute element={<Searchtrain />} />}
      />
      <Route
        path="/trainlisting"
        element={<PrivateRoute element={<Trainlisting />} />}
      />
      {/* <Route path="/usermanagement" element={<Usermanagement />} />
      <Route path="/reservationmanagement" element={<Reservationmanagement />} />
      <Route path="/trainmanagement" element={<Trainmanagement />} />
      <Route path="/searchtrain" element={<Searchtrain />} />
      <Route path="/trainlisting" element={<Trainlisting />} /> */}

      <Route path="/backOfficerLogin" element={<BackOfficerLogin />} />
      <Route path="/travelagentlogin" element={<Travelagentlogin />} />
    </Routes>
  );
}

export default App;
