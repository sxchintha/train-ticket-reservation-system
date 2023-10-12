import API from "../api/axiosConfig";

const getAllTrains = async () => {
  try {
    const response = await API.get("/Train");
  } catch (error) {}
};
