import API from "../api/axiosConfig";

const backOfficerLogin = async (data) => {
  try {
    const response = await API.post("/backofficer/login", data);
  } catch (error) {}
};
