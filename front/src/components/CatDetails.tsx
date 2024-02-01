import { Box, Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import fetechRequest from "../lib/api";
import useActionStore, { INIT_CAT } from "../store/useActionStore";
import { CustomModal, FavouriteButton } from "./";
import storage from "../lib/storage";

interface ICatDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}
interface IDisplayInfoProps {
  label: string;
  value: string | number;
}

export default function CatDetails({ isOpen, onClose }: ICatDetailsProps) {
  const currentCat = useActionStore((state) => state.cat);
  const setCat = useActionStore((state) => state.setCat);

  // console.log("img: ", currentCat);

  const onCloseDetails = () => {
    onClose();
    setCat(INIT_CAT);
  };

  const onAdopt = async (id: number | string) => {
    const userId = storage.getStorage("auth--chadopt").user.id;
    console.log(userId);
    await fetechRequest("PUT", `cat/adopt/${id}/user/${userId}`);

    onCloseDetails();
  };

  const Body = (
    <>
      <FavouriteButton cat={currentCat} />
      <Flex flexDir="column">
        <Flex flexDir={["column", "", "row"]}>
          <Image
            src={currentCat?.picture}
            alt={`Picture of ${currentCat?.name}`}
            boxSize={["100%", "", "18em"]}
            rounded="lg"
            m={["0 auto", "", "0 1em 0 0"]}
          />
          <Flex flexDir="column">
            <SimpleGrid columns={2} spacing={1}>
              <DisplayInfo label="Nom: " value={currentCat?.name} />
              <DisplayInfo label="Statut: " value={currentCat?.status} />
              <DisplayInfo label="Ville: " value={currentCat?.town} />
              <DisplayInfo label="Race: " value={currentCat?.race} />
              <DisplayInfo label="Sexe: " value={currentCat?.sex} />
              <DisplayInfo label="Age: " value={currentCat?.age} />
              <DisplayInfo
                label="Popularité: "
                value={currentCat?.popularity}
              />
              <DisplayInfo label="Nom: " value={currentCat?.name} />
            </SimpleGrid>

            <Flex flexDir="column" mt="1em">
              <Box fontSize="1rem" fontWeight="semibold" color="accent.1">
                Description
              </Box>
              <Box textTransform="capitalize" color="gray_5">
                {currentCat?.description}
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Button
          bgColor="accent.1"
          color="white"
          _hover={{ bg: "accent.2" }}
          onClick={() => onAdopt(currentCat?.id)}
          m="1em  auto 0 auto"
          display="flex"
          w="50%"
        >
          Adopter
        </Button>
      </Flex>
    </>
  );

  return <CustomModal isOpen={isOpen} onClose={onCloseDetails} body={Body} />;
}

const DisplayInfo = ({ label, value }: IDisplayInfoProps) => {
  return (
    <Flex>
      <Box fontSize="1rem" fontWeight="semibold" color="accent.1">
        {label}
      </Box>
      <Box textTransform="capitalize" ml=".5em" color="gray_5">
        {value}
      </Box>
    </Flex>
  );
};
