import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/index";
import Welcome from "./pages/welcome";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AllTrains from "./pages/allTrains";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/welcome" element={<Welcome />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/allTrains" element={<AllTrains />} />
    </Routes>
  );
}

export default App;
