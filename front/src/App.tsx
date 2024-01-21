import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivateRoute } from "./components";
import { lazy } from "react";

const CatsList = lazy(() => import("./pages/CatsList"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Routing = () => {
  const isLogged = false;
  return (
    <Router>
      <Routes>
        {/* <Route element={<PrivateRoute />}>
          <Route path="/" element={<CatsList />} />
        </Route> */}
        <Route path="/" element={<CatsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Routing />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
