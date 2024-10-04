import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function PrivateRoute() {
  const token = useAuthStore((state) => state.accessToken)
  return token ? <Outlet /> : <Navigate to="/login" />;
}
