import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "state";
import { fetchUserById } from "state/user/action";
import { userSelector } from "state/user/reducer";

export const useUserHook = () => {
  const { loading, email, isAdmin } = useSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = "sdfdsfds";
    dispatch(fetchUserById(userId));
  }, []);

  return {
    loading,
    email,
    isAdmin,
  };
};
