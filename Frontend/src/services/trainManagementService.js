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
    return response;
  } catch (error) {}
};

const cancelTrainSchedule = async (id) => {
  try {
    const response = await API.patch(`/Train/cancel/${id}`);
    return response;
  } catch (error) {}
};

const publishTrainSchedule = async (id) => {
  try {
    const response = await API.patch(`/Train/publish/${id}`);
    return response;
  } catch (error) {}
};

const editTrainSchedule = async (id) => {
  try {
    const response = await API.put(`/Train/${id}`);
    return response;
  } catch (error) {}
};

export {
  getAllTrains,
  createTrainSchedule,
  cancelTrainSchedule,
  publishTrainSchedule,
  editTrainSchedule,
};
