import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import api from "./lib/api";
import storage from "./lib/storage";
import Routing from "./Routing";
import theme from "./theme";

export default function App() {
  const queryClient = new QueryClient();
  // useLoadConstants();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Routing />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function useLoadConstants() {
  useEffect(() => {
    const init_data = async () => {
      try {
        const data = await api.getData("/constants");
        storage.setStorage("constants--chadopt", data);
      } catch (err) {
        console.error("Error initializing constants:", err);
      }
    };

    init_data();
  }, []);
}
