import {
  Box,
  Button,
  Flex,
  Image,
  // modal
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { FavouriteButton } from "../components";
import { ICat } from "../lib/interfaces";

interface ICatModal {
  cat: ICat;
  isOpen: boolean;
  setOpen: any;
}

export default function CatModal({ cat, isOpen, setOpen }: ICatModal) {
  const onAdopt = (id: number) => {
    setOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Détails du Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Flex>
              <Image
                src={cat?.picture}
                alt={`Picture of ${cat?.name}`}
                boxSize={"18em"}
                rounded="lg"
                mr="1em"
              />
              <Flex flexDir="column">
                <SimpleGrid columns={2} spacing={1}>
                  <DisplayInfo label="Nom: " value={cat?.name} />
                  <DisplayInfo label="Statut: " value={cat?.status} />
                  <DisplayInfo label="Ville: " value={cat?.town} />
                  <DisplayInfo label="Race: " value={cat?.race} />
                  <DisplayInfo label="Sexe: " value={cat?.sex} />
                  <DisplayInfo label="Age: " value={cat?.age} />
                </SimpleGrid>

                <Flex flexDir="column" mt="1em">
                  <Box fontSize="1rem" fontWeight="semibold">
                    Description
                  </Box>
                  <Box textTransform="capitalize" color="gray_5">
                    {cat?.description}
                  </Box>
                </Flex>
              </Flex>
            </Flex>

            <FavouriteButton cat={cat} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onAdopt(cat?.id)}>
            Adopter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const DisplayInfo = ({ label, value }: any) => {
  return (
    <Flex>
      <Box fontSize="1rem" fontWeight="semibold">
        {label}
      </Box>
      <Box textTransform="capitalize" ml=".5em" color="gray_5">
        {value}
      </Box>
    </Flex>
  );
};
