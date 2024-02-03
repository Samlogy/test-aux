import { Box, Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { useMemo } from "react";
import fetechRequest from "../lib/api";
import { getValueLabel } from "../lib/functions";
import storage from "../lib/storage";
import useActionStore, { INIT_CAT } from "../store/useActionStore";
import { CustomModal, FavouriteButton } from "./";
import { ICat } from "../lib/interfaces";

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

  const userData = useMemo(() => storage.getStorage("auth--chadopt").user, []);

  const userIdVisitor = !userData.isAdmin && userData.id;

  const onCloseDetails = () => {
    onClose();
    setCat(INIT_CAT);
  };

  const onAdopt = async (userId: number) => {
    await fetechRequest("POST", `cat/adopt/${currentCat?.id}/user/${userId}`);

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
  const onCancel = async (userId: number) => {
    await fetechRequest("DELETE", `cat/adopt/${currentCat?.id}/user/${userId}`);

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

  const onApprove = async (userId: number) => {
    await fetechRequest("PATCH", `cat/adopt/${currentCat?.id}/user/${userId}`);

    setCatsList((prev) =>
      prev.map((c) => {
        if (c.id === currentCat.id) {
          return { ...c, status: "ADOPTED" };
        }
        return c;
      })
    );
    onCloseDetails();
  };

  const constants = useMemo(() => storage.getStorage("consts--chadopt"), []);

  const Body = (
    <>
      <FavouriteButton cat={currentCat} />
      <Flex flexDir="column">
        <Flex flexDir={["column", "", "row"]}>
          <Image
            src={currentCat?.picture}
            alt={`Picture of ${currentCat?.name}`}
            boxSize={["100%", "", "50%"]}
            rounded="lg"
            m={["0 auto 1em auto", "", "0 .5em 0 0"]}
          />
          <Flex flexDir="column">
            <SimpleGrid columns={2} spacing={1}>
              <DisplayInfo label="Nom: " value={currentCat?.name} />
              <DisplayInfo
                label="Statut: "
                value={getValueLabel(constants.status, currentCat?.status)}
              />
              <DisplayInfo
                label="Ville: "
                value={getValueLabel(constants.towns, currentCat?.town)}
              />
              <DisplayInfo
                label="Race: "
                value={getValueLabel(constants.races, currentCat?.race)}
              />
              <DisplayInfo
                label="Sexe: "
                value={getValueLabel(constants.genders, currentCat?.sex)}
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

        {userData.isAdmin && (
          <Button
            bgColor={currentCat?.isReqAdopt ? "accent.1" : "white"}
            color={currentCat?.isReqAdopt ? "white" : "accent.1"}
            _hover={{ bg: currentCat?.isReqAdopt ? "accent.2" : "gray.100" }}
            onClick={() =>
              !currentCat?.isReqAdopt
                ? onApprove(userIdVisitor)
                : onCancel(userIdVisitor)
            }
            m="1em  auto 0 auto"
            display="flex"
            w="50%"
          >
            {!currentCat?.isReqAdopt ? "Approuver" : "Rejeter"}
          </Button>
        )}

        {currentCat.status !== "ADOPTED" && (
          <Button
            color={currentCat?.isReqAdopt ? "accent.1" : "white"}
            bgColor={currentCat?.isReqAdopt ? "white" : "accent.1"}
            _hover={{ bg: currentCat?.isReqAdopt ? "gray.100" : "accent.2" }}
            onClick={() =>
              !currentCat?.isReqAdopt
                ? onAdopt(userIdVisitor)
                : onCancel(userIdVisitor)
            }
            m="1em  auto 0 auto"
            display="flex"
            w="50%"
          >
            {!currentCat?.isReqAdopt ? "Adopter" : "Annuler"}
          </Button>
        )}
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
      <Box textTransform="capitalize" ml=".5em" color="gray.700">
        {value}
      </Box>
    </Flex>
  );
};
