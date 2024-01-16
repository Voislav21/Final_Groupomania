import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://api.groupomania-voislav.com/api/",
  withCredentials: true,
});