import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { Logo } from "../components";
import api from "../lib/api";
import { redirect } from "react-router-dom";

const Login = () => {
  const onAdmin = async () => {
    const user = await api.postData("/user/login", {
      email: "admin@gmail.com",
      password: "1234",
    });
    if (!user) return redirect("/login");
  };
  const onVisitor = async () => {
    const user = await api.postData("/user/login", {
      email: "visitor@gmail.com",
      password: "1234",
    });
    if (!user) return redirect("/login");
  };

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
            <Heading size={"lg"}>Se Connecter à son compte</Heading>
            <Heading size={"md"}>Continuer en tant que</Heading>
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
