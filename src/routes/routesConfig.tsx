import MemberGuard from "guards/MemberGuard";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "./route.interface";
import AdminLayout from "layout/AdminLayout";
import { AdminCoach, AdminDashBoard, AdminUser } from "views/Admin";

const BookingLayout = lazy(() => import("layout/BookingLayout"));
const BookingPage = lazy(() => import("views/Booking"));
// const AdminPage = lazy(() => import("views/Admin"));
const LoginPage = lazy(() => import("views/Login"));

export enum ROUTER_PATH {
  "LOGIN" = "/login",
  "BOOKING" = "/booking",
  "ADMIN" = "/admin",
  "ADMIN_USER" = "/admin/user",
  "ADMIN_COACH" = "/admin/coach",
  "ADMIN_DASHBOARD" = "/admin/dashboard",
}

export const routesConfig: RouteObject[] = [
  {
    element: <BookingLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        element: <MemberGuard />,
        children: [
          {
            path: ROUTER_PATH.ADMIN,
            element: <AdminLayout />,
            children: [
              {
                path: ROUTER_PATH.ADMIN_USER,
                element: <AdminUser />,
              },
              {
                path: ROUTER_PATH.ADMIN_COACH,
                element: <AdminCoach />,
              },
              {
                path: ROUTER_PATH.ADMIN_DASHBOARD,
                element: <AdminDashBoard />,
              },
            ],
          },
        ],
      },
    ],
  },

  // always put it as the last element
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
