import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useMemo, useState } from "react";
import {
  AiFillHeart,
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { Logo, LogoutButton, View } from "../components";
import storage from "../lib/storage";
import useFavCatsStore from "../store/useFavCatsStore";
import { ICat } from "../lib/interfaces";
import fetechRequest from "../lib/api";

const Links = [
  {
    link: "/",
    label: "Nos Chats",
  },
];

interface NavLinkProps {
  children: ReactNode;
  link: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, link }) => {
  const isActive = window.location.pathname === link;

  return (
    <Link
      as={RouterLink}
      href={link}
      _hover={{ textDecor: "none", cursor: "pointer", color: "accent.1" }}
    >
      <Box
        p=".5em"
        rounded="md"
        color={isActive ? "accent.1" : "gray.900"}
        fontWeight={isActive ? "bold" : "semibold"}
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
          onClick={() => setOpen(!isOpen)}
          _focus={{ outline: "none" }}
        />

        <Logo />

        <HStack spacing={8} align={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((el) => (
              <NavLink key={el.label} link={el?.link}>
                {el?.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <FavBtn />
        <LogoutButton />
      </Flex>

      <View cond={isOpen} pb={4} display={{ md: "none" }}>
        <Stack as={"nav"} spacing={4} align="center">
          {Links.map((el) => (
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

const FavBtn = () => {
  const isFav = useFavCatsStore((state) => state.isFav);
  const setFavCats = useFavCatsStore((state) => state.setFavCats);

  const handleFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    let cats: ICat[] = [];

    if (!isFav) {
      cats = storage.getStorage("favourite--chadopt");
    }

    setFavCats({ cats, isFav: !isFav });

    e.stopPropagation();
  };

  return (
    <IconButton
      isRound
      bg="transparent"
      color="gray.900"
      size="sm"
      aria-label="favourite-button"
      _hover={{ transform: "scale(1.1)" }}
      sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
      transition="all 0.15s ease"
      icon={
        isFav ? (
          <AiFillHeart size="22" color="#7B341E" />
        ) : (
          <AiOutlineHeart size="22" color="#7B341E" />
        )
      }
      onClick={handleFavourite}
    />
  );
};
