import { Navigate, Outlet } from "react-router-dom";
import storage from "../lib/storage";

export default function PrivateRoute() {
  const token = storage.getStorage("access-token--chadopt");
  return token ? <Outlet /> : <Navigate to="/login" />;
}
