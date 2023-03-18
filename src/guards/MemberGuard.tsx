import { Navigate, Outlet } from "react-router-dom";

const MemberGuard = () => {
  const user = false;
  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MemberGuard;
