import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import api from "./lib/api";
import storage from "./lib/storage";
import Routing from "./Routing";

export default function App() {
  const queryClient = new QueryClient();

  // useEffect(() => {
  //   const init_data = async () => {
  //     const data = await api.getData("/contants");
  //     storage.setStorage("constants--chadopt", data);
  //   };
  //   init_data();
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Routing />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
