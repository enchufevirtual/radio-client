import axios from "axios";

export const clientAxios = axios.create({
  baseURL: process.env.API_URL,
});
