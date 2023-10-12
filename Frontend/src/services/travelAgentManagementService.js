import API from "../api/axiosConfig";

const createTravelAgentAccount = async (data) => {
  try {
    console.log("Sending Data To Api", data);
    const response = await API.post("/TravelAgent/create", data);
    console.log("REs", response);
    // if(response.status)
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

const travelAgentLogin = async (data) => {
  try {
    const response = await API.post("/TravelAgent/login", data);

    console.log("REs", response);
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

export { createTravelAgentAccount, travelAgentLogin };
