import React from "react";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import NavBar from "./NavBar";

// import { NavBar, ProtectedPage } from "./";

interface ILayout {
  children: React.ReactNode;
  isHeaderVisible?: boolean;
  [restProps: string]: any;
}

export default function Layout({
  children,
  isHeaderVisible,
  ...restProps
}: ILayout) {
  const bgColor = useColorModeValue("white", "gray_3");
  return (
    <>
      <Flex flexDir="column" {...restProps} bg={bgColor} minH="100vh">
        {isHeaderVisible && <NavBar />}

        <Container
          maxW="80em"
          minH="calc(100% - 100px)"
          h="100%"
          p="6rem 1.5rem 2rem 1.5rem"
          borderRadius=".25rem"
        >
          {children}
        </Container>
      </Flex>
    </>
  );
}
