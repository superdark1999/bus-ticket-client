import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userSelector } from 'state/user/reducer';

function MemberGuard() {
  const { email, loading } = useSelector(userSelector);

  if (loading === 'succeeded' && !email) return <Navigate to="/login" />;

  return <Outlet />;
}

export default MemberGuard;
