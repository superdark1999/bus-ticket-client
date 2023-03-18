import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userSelector } from "state/user/reducer";

const MemberGuard = () => {
  const user = useSelector(userSelector);
  console.log("user: ", user);
  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MemberGuard;
