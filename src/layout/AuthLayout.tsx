import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return <>{token ? <Navigate to={"/"} replace /> : <Outlet />}</>;
};

export default AuthLayout;
