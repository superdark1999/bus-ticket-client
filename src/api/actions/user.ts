import axiosClient from "../apiClient";

const baseRoute = "/user";
const subRoutes = { detail: "/:id" };

Object.keys(subRoutes).forEach(
  (key) =>
    (subRoutes[key as keyof typeof subRoutes] =
      baseRoute + subRoutes[key as keyof typeof subRoutes])
);

const getUserById = async (params: any) => {
  try {
    const response = await axiosClient.get(subRoutes.detail, params);
    return response?.data;
  } catch (error) {
    console.log("error getUserById", error);
  }
};

const UserAPI = {
  getUserById,
};

export default UserAPI;
