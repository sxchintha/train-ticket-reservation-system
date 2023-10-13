import { BASE_URL } from "./apiConstants";
import axios from "axios";
const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
