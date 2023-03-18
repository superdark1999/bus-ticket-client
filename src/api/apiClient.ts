import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});

axios.interceptors.request.use(async (config) => {
  console.log("config", config);
  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status == 401) {
    }
    console.error("error");
    return Promise.reject(error);
  }
);

export default axiosClient;
