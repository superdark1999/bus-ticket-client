import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routesConfig";

const Router = () => {
  const routes = useRoutes(routesConfig);
  return routes;
};

export default Router;
