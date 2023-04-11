import axios from 'axios';
import { BASE_URL } from './utils/constant';

const axiosAdminTrip = axios.create({
  baseURL: BASE_URL.adminTrip,
});
const axiosAdminTripRoute = axios.create({
  baseURL: BASE_URL.adminTripRoute,
});
const axiosAdminCoach = axios.create({
  baseURL: BASE_URL.adminCoach,
});

axios.interceptors.request.use(async (config) => {
  console.log('config', config);
  return config;
});

[axiosAdminTrip, axiosAdminTripRoute, axiosAdminCoach].forEach((axiosAdminItem) => {
  axiosAdminItem.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('error');
      return Promise.reject(error);
    },
  );
});

const axiosAdmin = {
  axiosAdminTrip,
  axiosAdminCoach,
  axiosAdminTripRoute,
};
export default axiosAdmin;
