import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminAssets, AdminTripRoute, AdminDashBoard, AdminTrips, AdminUser, AdminDetailCoach } from 'views/Admin';
import ErrorPage, { ErrorStatus } from 'views/ErrorPage';
import { RouteObject } from './route.interface';

const MemberGuard = lazy(() => import('guards/MemberGuard'));
const AdminGuard = lazy(() => import('guards/AdminGuard'));
const BookingLayout = lazy(() => import('layout/BookingLayout'));
const AdminLayout = lazy(() => import('layout/AdminLayout'));
const HomePage = lazy(() => import('views/Booking/HomePage'));
const BookingPage = lazy(() => import('views/Booking/BookingPage'));
const ConfirmingPage = lazy(() => import('views/Booking/ConfirmingPage'));
const InputInfoPage = lazy(() => import('views/Booking/InputInfoPage'));
const PaymentPage = lazy(() => import('views/Booking/PaymentPage'));
const TicketPage = lazy(() => import('views/Booking/TicketPage'));
const LoginPage = lazy(() => import('views/auth/Login/LoginPage'));
const RegisterPage = lazy(() => import('views/auth/Register/RegisterPage'));
const ChangePasswordPage = lazy(() => import('views/auth/ChangePassword/ChangePasswordPage'));
const ForgotPasswordPage = lazy(() => import('views/auth/ForgotPassword/ForgotPasswordPage'));

/* eslint-disable  @typescript-eslint/naming-convention  */
export enum ROUTER_PATH {
  'LOGIN' = '/login',
  'BOOKING' = '/booking',
  'CONRFIRMING' = '/booking/confirming',
  'ADMIN' = '/admin',
  'ADMIN_USER' = '/admin/user',
  'ADMIN_COACH' = '/admin/coach',
  'ADMIN_DASHBOARD' = '/admin/dashboard',
  'ADMIN_ASSETS' = '/admin/assets',
  'ADMIN_TRIPS' = '/admin/trips',
  'ADMIN_TRIP_ROUTES' = '/admin/trip-routes',
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
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/change-password',
        element: <ChangePasswordPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        element: <MemberGuard />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: '/booking',
            element: <BookingPage />,
          },
          {
            path: ROUTER_PATH.CONRFIRMING,
            element: <ConfirmingPage />,
          },
          {
            path: '/booking/input-info',
            element: <InputInfoPage />,
          },
          {
            path: '/booking/payment',
            element: <PaymentPage />,
          },
          {
            path: '/ticket',
            element: <TicketPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminGuard />,
    children: [
      {
        element: <AdminLayout />,
        path: '/admin',
        children: [
          {
            path: ROUTER_PATH.ADMIN_USER,
            element: <AdminUser />,
          },
          {
            path: ROUTER_PATH.ADMIN_TRIP_ROUTES,
            element: <AdminTripRoute />,
          },
          {
            path: `${ROUTER_PATH.ADMIN_COACH}/:id`,
            element: <AdminDetailCoach coachId="id" />,
          },
          {
            path: ROUTER_PATH.ADMIN_DASHBOARD,
            element: <AdminDashBoard />,
          },
          {
            path: ROUTER_PATH.ADMIN_ASSETS,
            element: <AdminAssets />,
          },
          {
            path: ROUTER_PATH.ADMIN_TRIPS,
            element: <AdminTrips />,
          },
        ],
      },
    ],
  },
  {
    element: <ErrorPage status={ErrorStatus.NOT_FOUND} />,
    path: '/404',
  },
  {
    element: <ErrorPage status={ErrorStatus.AUTHORIZED} />,
    path: '/403',
  },
  // always put it as the last element
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];
