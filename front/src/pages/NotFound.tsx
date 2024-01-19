import React from "react";
import { Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";

function Page404() {
  return (
    <Layout
      textAlign="center"
      py={10}
      px={6}
      h="100vh"
      // w="full"
      display="flex"
      justifyContent="center"
    >
      <Heading
        display="inline-block"
        as="h1"
        fontSize="90px"
        bgGradient="linear(to-r, green.400, green.600)"
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

      {/* <Link to="/"> */}
      <Button
        as={Link}
        to="/cats"
        colorScheme="green"
        bgGradient="linear(to-r, green.400, green.500, green.600)"
        color="white"
        variant="solid"
      >
        Retourner vers l'acceuil
      </Button>
      {/* </Link> */}
    </Layout>
  );
}

export default Page404;
