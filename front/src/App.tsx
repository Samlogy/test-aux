import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Routing from "./Routing";
import ErrorFallback from "./components/FallBackPage";
import fetechRequest from "./lib/api";
import storage from "./lib/storage";
import theme from "./theme";

export default function App() {
  useInitApp();

  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onReset={() => window.location.reload()}
    >
      <ChakraProvider theme={theme}>
        <Routing />
      </ChakraProvider>
    </ErrorBoundary>
  );
}

const useInitApp = () => {
  useEffect(() => {
    const init_data = async () => {
      try {
        const data = await fetechRequest("GET", "consts");
        storage.setStorage("consts--chadopt", data);
      } catch (err) {
        console.error("Error initializing constants:", err);
      }
    };

    init_data();
  }, []);
};
