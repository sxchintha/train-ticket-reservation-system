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
    console.log("booking in booking", booking);
    const response = await API.post("/Booking/create", booking);
    console.log("response in boook", response);
    return response;
  } catch (error) {
    console.log("Errpr i n booking", error);
    return error;
  }
};

const cancelBooking = async (id) => {
  try {
    const response = await API.patch(`/Booking/cancel/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteBooking = async (id) => {
  try {
    const response = await API.delete(`/Booking/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const editBooking = async (id, booking) => {
  try {
    const response = await API.put(`/Booking/${id}`, booking);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllBookings,
  createBooking,
  cancelBooking,
  deleteBooking,
  editBooking,
};
