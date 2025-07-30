import axios from "axios";
// const BASE_URL = "http://localhost:8080/api/";
// const BASE_URL = "http://103.235.106.86:5000/api/";
const BASE_URL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

// axios.defaults.headers.common["Authorization"] = `Bearer ${}`;
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
