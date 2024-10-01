import { Spinner } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PrivateRoute } from "./components";
import useAuthStore from "./store/useAuthStore";

const CatsList = lazy(() => import("./pages/CatsList"));
const AdminList = lazy(() => import("./pages/AdminList"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function Routing() {
  const user = useAuthStore((state) => state.user)
  return (
    <Suspense
      fallback={
        <Spinner color="brown" thickness="4px" speed="0.65s" size="xl" />
      }
    >
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={user.isAdmin ? <AdminList /> : <CatsList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}
