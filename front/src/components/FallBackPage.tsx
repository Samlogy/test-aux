import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const FallbackPage: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      minH="100vh"
      textAlign="center"
    >
      <Heading mb="4">Oops! Quelque chose s'est mal passé.</Heading>
      <Text color="gray.500">
        Nous nous excusons pour le désagrément. Veuillez réessayer plus tard.
      </Text>
    </Flex>
  );
};

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return <FallbackPage />;
};

export default ErrorFallback;
