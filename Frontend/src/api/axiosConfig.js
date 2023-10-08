import { BASE_URL } from "./apiConstants";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
