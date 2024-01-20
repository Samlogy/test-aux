import { Box, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CatModal } from "./";

import { ICat } from "../lib/interfaces";
import { FavouriteButton } from "./";

interface ICard {
  cat: ICat;
  readOnly?: boolean;
}

export default function Card({ cat, readOnly = false }: ICard) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Flex
        m={".5em 1em"}
        w="15em"
        align="center"
        justify="center"
        cursor={"pointer"}
        // anim
        as={motion.div}
        layout
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!isOpen);
        }}
      >
        <Box bg={"gray_9"} w="full" rounded="lg" shadow="lg" pos="relative">
          <FavouriteButton cat={cat} />

          <Image
            src={cat?.picture}
            alt={`Picture of ${cat?.name}`}
            roundedTop="lg"
          />

          <Box p="1rem">
            <Flex justify="space-between" alignContent="center">
              <Box
                fontSize="1.2rem"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {cat?.name}
              </Box>
            </Flex>

            <Flex
              flexDir={"column"}
              justify="space-between"
              alignContent="center"
            ></Flex>
          </Box>
        </Box>
      </Flex>

      <CatModal cat={cat} isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
