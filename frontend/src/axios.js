import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api` || "https://api.groupomania-voislav.com/api";

export const makeRequest = axios.create({
  baseURL,
  withCredentials: true,
});
