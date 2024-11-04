import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getErrorMessage = (error: Error) => {
  if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === 401) return error.response.data.message;
  }

  return error.message;
};
