import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "./route.interface";

const MemberGuard = lazy(() => import("guards/MemberGuard"));
const AdminGuard = lazy(() => import("guards/AdminGuard"));

const BookingLayout = lazy(() => import("layout/BookingLayout"));
const AdminLayout = lazy(() => import("layout/AdminLayout"));
const BookingPage = lazy(() => import("views/Booking"));
const AdminPage = lazy(() => import("views/Admin"));
const LoginPage = lazy(() => import("views/Login"));

export const routesConfig: RouteObject[] = [
  {
    element: <BookingLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <MemberGuard />,
        children: [
          {
            path: "/booking",
            element: <BookingPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        element: <AdminGuard />,
        children: [
          {
            path: "/admin",
            element: <AdminPage />,
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
