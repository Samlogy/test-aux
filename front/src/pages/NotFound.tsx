import { Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Page404() {
  return (
    <Layout
      textAlign="center"
      py={10}
      px={6}
      h="100vh"
      display="flex"
      justifyContent="center"
    >
      <Heading
        display="inline-block"
        as="h1"
        fontSize="90px"
        bgGradient="linear(to-r, blue.400, blue.600)"
        backgroundClip="text"
      >
        404
      </Heading>

      <Text fontSize="26px" mt={3} mb={2}>
        Not Found
      </Text>

      <Text color={"gray.500"} mb={6} fontSize="18px">
        Cette page n'existe pas
      </Text>

      <Button
        as={Link}
        to="/"
        colorScheme="blue"
        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
        color="white"
        variant="solid"
      >
        Retourner vers l'acceuil
      </Button>
    </Layout>
  );
}
