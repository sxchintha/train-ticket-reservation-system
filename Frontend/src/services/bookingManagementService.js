import axios from "axios";
import API from "../api/axiosConfig";

const getAllBookings = async () => {
  try {
    const response = await API.get("/Booking");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllBookings };
