import { Navigate, Outlet } from "react-router-dom";
import storage from "../lib/storage";
import { useMemo } from "react";

export default function PrivateRoute() {
  const token = useMemo(() => storage.getStorage("auth--chadopt")?.token, []);
  return token ? <Outlet /> : <Navigate to="/login" />;
}
