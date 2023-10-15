import API from "../api/axiosConfig";

const getAllTravelers = async () => {
  try {
    const response = await API.get("/User");
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createTravelerAccount = async (data) => {
  try {
    const response = await API.post("/User/traveler/create", data);
    console.log("REs", response);
    return response.status;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteTravelerAccount = async (id) => {
  try {
    const response = await API.delete(`/User/${id}`);
    return response.status;
  } catch (error) {
    return false;
  }
};

const editTravelerAccount = async (id, data) => {
  try {
    const response = await API.put(`/User/${id}`, data);
    return response.status;
  } catch (error) {
    return false;
  }
};

const deactivateTravelerAccount = async (id) => {
  try {
    const response = await API.patch(`/User/deactivate/${id}`);
    return response.status;
  } catch (error) {
    return false;
  }
};

export {
  getAllTravelers,
  createTravelerAccount,
  deleteTravelerAccount,
  editTravelerAccount,
  deactivateTravelerAccount,
};
