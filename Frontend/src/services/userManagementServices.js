import API from "../api/axiosConfig";

const createBackOfficerAccount = async (data) => {
  try {
    console.log("Sending Data To Api", data);
    const response = await API.post("/Backoffice/create", data);
    console.log("REs", response);
    // if(response.status)
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

const backOfficerLogin = async (data) => {
  try {
    const response = await API.post("/Backoffice/login", data);

    console.log("REs", response);
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

export { createBackOfficerAccount, backOfficerLogin };
