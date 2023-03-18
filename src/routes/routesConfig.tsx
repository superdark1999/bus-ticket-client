import MemberGuard from "guards/MemberGuard";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "./route.interface";

const BookingLayout = lazy(() => import("layout/BookingLayout"));
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
        path: "/booking",
        element: <BookingPage />,
      },
      {
        element: <MemberGuard />,
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
