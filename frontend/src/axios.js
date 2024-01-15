import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://api.groupomania-voislav.com/api/",
  withCredentials: true,
});