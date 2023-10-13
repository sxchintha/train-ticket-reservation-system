import API from "../api/axiosConfig";

const getAllTrains = async () => {
  try {
    const response = await API.get("/Train");
    return response;
  } catch (error) {}
};

const createTrainSchedule = async (data) => {
  try {
    const response = await API.post("/Train", data);
    console.log("REs", response);
  } catch (error) {}
};

export { getAllTrains, createTrainSchedule };
