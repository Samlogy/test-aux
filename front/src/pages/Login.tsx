import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { Logo } from "../components";

const Login = () => {
  const onAdmin = () => {};
  const onVisitor = () => {};

  return (
    <Box
      h="100vh"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
      bg="gray.100"
    >
      <Stack
        w={["80%", "70%", "450px"]}
        m="0 auto"
        spacing="8"
        boxShadow={"xl"}
        p="1em"
        rounded="xl"
        bg="white"
      >
        <Stack spacing="6">
          <Logo size="lg" />
          <Stack spacing={"2"} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Se Connecter à son compte
            </Heading>
            <Heading size={{ base: "xs", md: "sm" }}>
              Continuer en tans que
            </Heading>
          </Stack>
        </Stack>
        <Box py={{ base: "0", sm: "8" }} px={"4"}>
          <Stack spacing="6">
            <Stack spacing="5">
              <Button onClick={onVisitor} variant="solid" colorScheme="blue">
                Visiteur
              </Button>
              <Button onClick={onAdmin} variant="outline" colorScheme="blue">
                Admin
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default Login;
