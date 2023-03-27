import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminCoach, AdminDashBoard, AdminUser } from 'views/Admin';
import { RouteObject } from './route.interface';

const MemberGuard = lazy(() => import('guards/MemberGuard'));
const AdminGuard = lazy(() => import('guards/AdminGuard'));
const BookingLayout = lazy(() => import('layout/BookingLayout'));
const AdminLayout = lazy(() => import('layout/AdminLayout'));
const BookingPage = lazy(() => import('views/Booking'));
const LoginPage = lazy(() => import('views/Login'));

export enum ROUTER_PATH {
  'LOGIN' = '/login',
  'BOOKING' = '/booking',
  'ADMIN' = '/admin',
  'ADMIN_USER' = '/admin/user',
  'ADMIN_COACH' = '/admin/coach',
  'ADMIN_DASHBOARD' = '/admin/dashboard',
}

export const routesConfig: RouteObject[] = [
  {
    element: <BookingLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        element: <MemberGuard />,
        children: [
          {
            path: '/booking',
            element: <BookingPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminLayout />,
    path: '/admin',
    children: [
      {
        element: <AdminGuard />,
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

  // always put it as the last element
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];
