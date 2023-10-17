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
  } catch (error) {
    return error;
  }
};

const publishTrainSchedule = async (id) => {
  try {
    const response = await API.patch(`/Train/publish/${id}`);
    return response;
  } catch (error) {}
};

const editTrainSchedule = async (id, data) => {
  try {
    const response = await API.put(`/Train/${id}`, data);
    return response;
  } catch (error) {}
};

const searchForTrains = async (fromStation, toStation) => {
  try {
    console.log("From", {
      params: { fromStation, toStation },
    });
    const response = await API.get("/Train/search", {
      params: { fromStation, toStation },
    });
    return response;
  } catch (error) {
    console.log("Errpr in search", error);
  }
};

const deleteTrainSchedule = async (id) => {
  try {
    const response = await API.delete(`/Train/${id}`);
    return response;
  } catch (error) {}
};

export {
  getAllTrains,
  createTrainSchedule,
  cancelTrainSchedule,
  publishTrainSchedule,
  editTrainSchedule,
  searchForTrains,
  deleteTrainSchedule,
};
