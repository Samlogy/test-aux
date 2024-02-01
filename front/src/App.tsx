import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import Routing from "./Routing";
import fetechRequest from "./lib/api";
import storage from "./lib/storage";
import theme from "./theme";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/FallBackPage";

export default function App() {
  const queryClient = new QueryClient();
  useInitApp();

  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onReset={() => window.location.reload()}
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Routing />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

const useInitApp = () => {
  const INIT_FILTERS = {
    name: "",
    status: "",
    town: "",
    isFavourite: false,
  };

  useEffect(() => {
    const init_data = async () => {
      try {
        storage.setStorage("filters--chadopt", INIT_FILTERS);

        const data = await fetechRequest("GET", "consts");
        storage.setStorage("consts--chadopt", data);
      } catch (err) {
        console.error("Error initializing constants:", err);
      }
    };

    init_data();
  }, []);
};
