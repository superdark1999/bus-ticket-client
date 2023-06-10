import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelector } from 'state/user/reducer';

function AdminGuard() {
  const { isAdmin, loading } = useSelector(userSelector);
  console.log('admin', isAdmin);

  if (loading === 'succeeded' && !isAdmin) return <Navigate to="/login" />;
  return <Outlet />;
}

export default AdminGuard;
