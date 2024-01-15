import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://195.35.2.197:8080/api/",
  withCredentials: true,
});