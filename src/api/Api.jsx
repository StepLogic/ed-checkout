import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("🚀 ~ file: Api.jsx:4 ~ BASE_URL:", BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});
