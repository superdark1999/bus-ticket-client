import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});

axios.interceptors.request.use(async (config) => {
  console.log("config", config);
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;
    // if (res.status == 401) {
    // }
    console.error(res);
    return Promise.reject(error);
  }
);

export default axiosClient;
