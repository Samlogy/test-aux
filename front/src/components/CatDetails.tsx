import { Box, Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { useMemo } from "react";
import fetechRequest from "../lib/api";
import { getValueLabel } from "../lib/functions";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";
import useActionStore, { INIT_CAT } from "../store/useActionStore";
import { CustomModal, FavouriteButton, View } from "./";

interface ICatDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  setCatsList: React.Dispatch<React.SetStateAction<ICat[]>>;
}
interface IDisplayInfoProps {
  label: string;
  value: string | number;
}

export default function CatDetails({
  isOpen,
  onClose,
  setCatsList,
}: ICatDetailsProps) {
  const currentCat = useActionStore((state) => state.cat);
  const setCat = useActionStore((state) => state.setCat);

  const user = useMemo(() => storage.getStorage("auth--chadopt").user, []);
  const CONSTANTS = useMemo(() => storage.getStorage("consts--chadopt"), []);

  const onCloseDetails = () => {
    onClose();
    setCat(INIT_CAT);
  };

  const onAdopt = async () => {
    const payload = {
      userId: user.id,
      catId: currentCat.id,
      name: user.email.split('@')[0],
      picture: user.picture ? user.picture : ""
    }
    await fetechRequest("POST", `cat/adopt`, payload as unknown as BodyInit);

    setCatsList((prev) =>
      prev.map((c) => {
        if (c.id === currentCat.id) {
          return { ...c, isReqAdopt: true };
        }
        return c;
      })
    );
    onCloseDetails();
  };
  const onCancel = async () => {
    await fetechRequest("DELETE", `cat/adopt/${currentCat?.id}/user/${user.id}`);

    setCatsList((prev) =>
      prev.map((c) => {
        if (c.id === currentCat.id) {
          return { ...c, isReqAdopt: false };
        }
        return c;
      })
    );
    onCloseDetails();
  };

  // console.log('catt => ', currentCat)

  const BASE_URL = "http://localhost:3001/" + currentCat.picture;
  const Body = (
    <>
      {
        !user.isAdmin ? <FavouriteButton cat={currentCat} /> : null
      }
      <Flex flexDir="column">
        <Flex flexDir={["column", "column", "row"]} justifyContent="space-evenly">
          <Image
            src={
              currentCat.picture.includes("http")
                ? currentCat.picture
                : BASE_URL
            }
            alt={`Picture of ${currentCat?.name}`}
            boxSize={["100%", "80%", "50%"]}
            rounded="lg"
            m={["0 auto 1em auto", "", "0 .5em 0 0"]}
          />
          <Flex flexDir="column">
            <SimpleGrid columns={2} spacing={1}>
              <DisplayInfo label="Nom: " value={currentCat?.name} />
              <DisplayInfo
                label="Statut: "
                value={getValueLabel(CONSTANTS.status, currentCat?.status)}
              />
              <DisplayInfo
                label="Ville: "
                value={getValueLabel(CONSTANTS.towns, currentCat?.town)}
              />
              <DisplayInfo
                label="Race: "
                value={getValueLabel(CONSTANTS.races, currentCat?.race)}
              />
              <DisplayInfo
                label="Genre: "
                value={getValueLabel(CONSTANTS.genders, currentCat?.gender)}
              />
              <DisplayInfo label="Age: " value={currentCat?.age} />
              <DisplayInfo
                label="Popularité: "
                value={currentCat?.popularity}
              />
              <DisplayInfo label="Nom: " value={currentCat?.name} />
            </SimpleGrid>

            <Flex flexDir="column" mt=".5em">
              <Box fontSize="1rem" fontWeight="semibold" color="accent.1">
                Description
              </Box>
              <Box textTransform="capitalize" color="gray.700">
                {currentCat?.description}
              </Box>
            </Flex>
          </Flex>
        </Flex>

        {/* {!user.isAdmin && currentCat.status !== "ADOPTED" ? (
          <Button
            color={currentCat?.isReqAdopt ? "accent.1" : "white"}
            bgColor={currentCat?.isReqAdopt ? "white" : "accent.1"}
            _hover={{ bg: currentCat?.isReqAdopt ? "gray.100" : "accent.2" }}
            onClick={() =>
              currentCat?.isReqAdopt
                ? onCancel(userIdVisitor)
                : onAdopt(userIdVisitor)
            }
            m="1em  auto 0 auto"
            display="flex"
            w="50%"
          >
            {!currentCat?.isReqAdopt ? "Adopter" : "Annuler"}
          </Button>
        ) : null} */}

        <View cond={!user.isAdmin && currentCat.status !== "ADOPTED"}>
          <Button
            color={currentCat?.isReqAdopt ? "accent.1" : "white"}
            bgColor={currentCat?.isReqAdopt ? "white" : "accent.1"}
            _hover={{ bg: currentCat?.isReqAdopt ? "gray.100" : "accent.2" }}
            onClick={() =>
              currentCat?.isReqAdopt
                ? onCancel()
                : onAdopt()
            }
            m="1em  auto 0 auto"
            display="flex"
            w="50%"
          >
            {currentCat?.isReqAdopt ? "Annuler" : "Adopter"}
          </Button>
        </View>
      </Flex>
    </>
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onCloseDetails}
      body={Body}
      size="xl"
    />
  );
}

const DisplayInfo = ({ label, value }: IDisplayInfoProps) => {
  return (
    <Flex>
      <Box fontSize="1rem" fontWeight="semibold" color="accent.1">
        {label}
      </Box>
      <Box textTransform="capitalize" ml=".5em" color="gray.700">
        {value}
      </Box>
    </Flex>
  );
};
