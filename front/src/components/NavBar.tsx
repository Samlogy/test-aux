import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { View } from "../components";

const Links = [
  {
    link: "/cats",
    label: "Nos Chats",
  },
];

interface NavLinkProps {
  children: ReactNode;
  link: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, link }) => {
  const linkColor = useColorModeValue("gray_2", "gray_7");
  const accentColor = useColorModeValue("accent_3", "accent_5");

  const isActive = window.location.pathname === link;

  return (
    <Link
      as={RouterLink}
      href={link}
      _hover={{ textDecor: "none", cursor: "pointer", color: accentColor }}
    >
      <Box
        p=".5em"
        rounded="md"
        color={isActive ? accentColor : linkColor}
        w="auto"
        textTransform="capitalize"
      >
        {children}
      </Box>
    </Link>
  );
};

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);

  const isVisible = useBreakpointValue({ base: false, md: true });

  const menuIcon = (
    <Flex justify="center" align="center">
      {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </Flex>
  );

  return (
    <Box
      bg={useColorModeValue("white", "gray_2")}
      px="2em"
      pos="fixed"
      w="full"
      boxShadow={"md"}
      zIndex={200}
    >
      <Flex h="10vh" align="center" justify="space-between">
        <IconButton
          size={"md"}
          icon={menuIcon}
          aria-label={"toggle-menu"}
          display={{ md: "none" }}
          onClick={isOpen ? () => setOpen(false) : () => setOpen(true)}
          _focus={{ outline: "none" }}
        />

        <RouterLink to="/cats">
          <Image src="/logo.jpg" alt="logo" boxSize={"3.5em"} />
        </RouterLink>

        <HStack spacing={8} align={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((el: any) => (
              <NavLink key={el.label} link={el?.link}>
                {el?.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        {isVisible && <Flex align={"center"}></Flex>}
      </Flex>

      <View cond={isOpen} pb={4} display={{ md: "none" }}>
        <Stack as={"nav"} spacing={4} align="center">
          {Links.map((el: any) => (
            <NavLink key={el.label} link={el?.link}>
              {el?.label}
            </NavLink>
          ))}
        </Stack>

        {!isVisible && (
          <Flex
            flexDir="column"
            align={"center"}
            justify="center"
            mt="1em"
          ></Flex>
        )}
      </View>
    </Box>
  );
}
