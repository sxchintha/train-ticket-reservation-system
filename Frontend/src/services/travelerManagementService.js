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

export { getAllTravelers };
