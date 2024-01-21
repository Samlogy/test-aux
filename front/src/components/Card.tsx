import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CatDelete, CatDetails } from "./";

import { MdDelete, MdEdit } from "react-icons/md";
import { ICat } from "../lib/interfaces";
import { FavouriteButton } from "./";

export default function Card({ cat }: { cat: ICat }) {
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
  };
  const onDelete = (e) => {
    setIsDelete(true);
    e.stopPropagation();
  };

  const handleClick = () => {
    setOpen(!isOpen);
  };

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
        onClick={handleClick}
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

              <IconButton
                aria-label="modifier-chat"
                icon={<MdEdit size="18" />}
                isRound
                pos="absolute"
                top="4"
                right="4"
                onClick={onEdit}
              />
              <IconButton
                aria-label="supprimer-chat"
                icon={<MdDelete size="18" />}
                isRound
                pos="absolute"
                top="4"
                right="16"
                onClick={onDelete}
              />
            </Flex>

            <Flex
              flexDir={"column"}
              justify="space-between"
              alignContent="center"
            ></Flex>
          </Box>
        </Box>
      </Flex>

      <CatDetails
        cat={cat}
        isOpen={isOpen}
        setOpen={setOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <CatDelete catId={cat.id} isOpen={isDelete} setOpen={setIsDelete} />
    </>
  );
}
