import axios from "axios";

export const clientAxios = axios.create({
  baseURL: 'https://radio-back-production.up.railway.app/api/radio/v1',
});
