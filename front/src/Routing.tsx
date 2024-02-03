import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoute } from "./components";
import { Spinner } from "@chakra-ui/react";

const CatsList = lazy(() => import("./pages/CatsList"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function Routing() {
  return (
    <Suspense
      fallback={
        <Spinner color="brown" thickness="4px" speed="0.65s" size="xl" />
      }
    >
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<CatsList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}
