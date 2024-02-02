import { Box, Flex, IconButton, Image, Tag } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MouseEvent, useMemo } from "react";
import { GiFemale, GiMale } from "react-icons/gi";
import { MdDelete, MdEdit } from "react-icons/md";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";
import useAction from "../store/useActionStore";
import { FavouriteButton, View } from "./";

export default function Card({ cat }: { cat: ICat }) {
  const actions = useAction((state) => state.actions);
  const state = useAction((state) => state.state);
  const setCat = useAction((state) => state.setCat);

  // console.log("Item: ", cat);

  const isAdmin = useMemo(
    () => storage.getStorage("auth--chadopt")?.user.isAdmin,
    []
  );

  const onEdit = (e: MouseEvent) => {
    actions.setEdit(true);
    setCat(cat);
    e.stopPropagation();
  };
  const onDelete = (e: MouseEvent) => {
    actions.setDelete(true);
    setCat(cat);
    e.stopPropagation();
  };
  const onDetails = () => {
    actions.setDetails(!state.details);
    setCat(cat);
  };

  return (
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
      onClick={onDetails}
    >
      <Box w="full" rounded="lg" shadow="lg" pos="relative">
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

            {cat?.sex === "Female" ? (
              <GiFemale size="22" />
            ) : (
              <GiMale size="22" />
            )}

            <View cond={isAdmin}>
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
            </View>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
