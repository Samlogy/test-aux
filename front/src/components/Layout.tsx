import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";

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
  return (
    <>
      <Flex flexDir="column" {...restProps} bg={"white"} minH="100vh">
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
