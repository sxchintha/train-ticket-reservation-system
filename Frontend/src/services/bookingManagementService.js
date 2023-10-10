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

const createBooking = async (booking) => {
  try {
    const response = await API.post("/Booking", booking);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllBookings, createBooking };
