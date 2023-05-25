import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://115.247.20.237:8800/api/",
  withCredentials: true,
});
