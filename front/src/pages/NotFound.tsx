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
        bgGradient="linear(to-r, accent.1, accent.2)"
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
        bgGradient="linear(to-r, accent.1, accent.1, accent.2)"
        color="white"
        _hover={{
          bg: "accent.2",
        }}
      >
        Retourner vers l'acceuil
      </Button>
    </Layout>
  );
}
