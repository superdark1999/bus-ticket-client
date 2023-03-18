import axiosClient from "../apiClient";

const baseRoute = "/auth";
const subRoutes = {
  login: "/login",
  register: "/register",
};

Object.keys(subRoutes).forEach(
  (key) =>
    (subRoutes[key as keyof typeof subRoutes] =
      baseRoute + subRoutes[key as keyof typeof subRoutes])
);

export const login = async (data: any) => {
  try {
    const response = await axiosClient.post(subRoutes.login, data);
    return response?.data;
  } catch (error) {
    console.log("error login", error);
  }
};
