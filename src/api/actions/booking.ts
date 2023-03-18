import axiosClient from "api/apiClient";

const baseRoute = "/booking";
const subRoutes = {
  searchTicket: "/search-ticket",
  register: "/payment",
};

Object.keys(subRoutes).forEach(
  (key) =>
    (subRoutes[key as keyof typeof subRoutes] =
      baseRoute + subRoutes[key as keyof typeof subRoutes])
);

export const getConfig = async () => {
  try {
    const response = await axiosClient.get(subRoutes.searchTicket);
    return response.data;
  } catch (error) {
    console.log("error getConfig", error);
  }
};
