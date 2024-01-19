import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CatsList, Login, NotFound } from "./pages";

const Routing = () => {
  const isLogged = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="cats" element={<CatsList />} />
          <Route index element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return <Routing />;
}
