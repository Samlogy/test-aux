import { Container, Flex, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import NavBar from "./NavBar";

interface ILayout extends BoxProps {
  children: ReactNode;
  isHeaderVisible?: boolean;
}

const Layout = ({ children, isHeaderVisible, ...restProps }: ILayout) => {
  return (
    <>
      <Flex flexDir="column" {...restProps} bg="#fefefe" minH="100vh">
        {isHeaderVisible && <NavBar />}
        <Container
          maxW="90em"
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
};

export default Layout;
