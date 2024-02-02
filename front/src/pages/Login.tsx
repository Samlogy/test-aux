import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Layout, Logo } from "../components";
import fetechRequest from "../lib/api";
import useAuthStore from "../store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();

  const setLogin = useAuthStore((state) => state.setLogin);

  const onAdmin = async () => {
    const data = await fetechRequest("POST", `user/login`, {
      email: "admin@gmail.com",
      password: "1234",
    });
    if (data) {
      setLogin(data);
      return navigate("/");
    }
  };
  const onVisitor = async () => {
    const data = await fetechRequest("POST", `user/login`, {
      email: "visitor@gmail.com",
      password: "1234",
    });
    if (data) {
      setLogin(data);
      return navigate("/");
    }
  };

  return (
    <Layout>
      <Stack
        w={["100%", "70%", "450px"]}
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
            <Heading size={"md"}>en tans que</Heading>
          </Stack>
        </Stack>
        <Box py={{ base: "0", sm: "8" }} px={"4"}>
          <Stack spacing="6">
            <Stack spacing="5">
              <Button
                onClick={onVisitor}
                bgColor="accent.1"
                color="white"
                _hover={{
                  bg: "accent.2",
                }}
              >
                Visiteur
              </Button>
              <Button
                onClick={onAdmin}
                color="accent.1"
                bgColor="white"
                border="1px solid"
                borderColor="accent.1"
              >
                Admin
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Layout>
  );
}
