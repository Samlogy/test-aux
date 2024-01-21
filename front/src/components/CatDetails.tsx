import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  Input,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../lib/api";
import { CustomModal, FavouriteButton } from "./";

const TOWNS = [];
const RACES = [];
const SEX = [];
const STATUS = [];

export default function CatDetails({
  cat,
  isOpen,
  setOpen,
  isEdit,
  setIsEdit,
}: any) {
  const [chat, setChat] = useState(cat);

  const body = (
    <>
      <Flex>
        {isEdit ? (
          <EditCat
            cat={chat}
            setChat={setChat}
            onClose={() => setOpen(false)}
            isEdit={isEdit}
          />
        ) : (
          <>
            <FavouriteButton cat={chat} />
            <DisplayCat cat={chat} />
          </>
        )}
      </Flex>
    </>
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={() => {
        setOpen(false);
        setIsEdit(false);
      }}
      body={body}
      // footer={footer}
    />
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

const DisplayCat = ({ cat }: any) => {
  return (
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
          <DisplayInfo label="Nom: " value={cat?.name} />
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
  );
};
const EditCat = ({ cat, setChat, onClose, isEdit }: any) => {
  const onAdopt = (id: number) => {
    onClose();
    // await api.putData("/cat/" + cat.id, chat);
  };
  const onEdit = async (id: number) => {
    onClose();
    // await api.putData("/cat/" + id, chat);
  };

  return (
    <Flex flexDir="column">
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
            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Nom
              </Box>
              <Input
                placeholder="Nom"
                value={cat.name}
                onChange={(e) => setChat({ ...cat, name: e.target.value })}
              />
            </Flex>

            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Age
              </Box>
              <Input
                placeholder="Age"
                value={cat.age}
                onChange={(e) => setChat({ ...cat, age: e.target.value })}
              />
            </Flex>

            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Race
              </Box>
              <Select
                placeholder="Statut"
                value={cat.status}
                onChange={(e) => setChat({ ...cat, status: e.target.value })}
              >
                {STATUS.map((status) => (
                  <option key={status.value} value={status.label}>
                    {status.value}
                  </option>
                ))}
              </Select>
            </Flex>

            <Flex flexDir={"column"}>
              <Box fontSize="1rem" fontWeight="semibold">
                Race
              </Box>
              <Select
                placeholder="Race"
                name="race"
                onChange={(e) => setChat({ ...cat, race: e.target.value })}
              >
                {RACES.map((race) => (
                  <option key={race.value} value={race.label}>
                    {race.value}
                  </option>
                ))}
              </Select>
            </Flex>

            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Sexe
              </Box>
              <Select
                placeholder="Sexe"
                name="sex"
                onChange={(e) => setChat({ ...cat, sex: e.target.value })}
              >
                {SEX.map((sex) => (
                  <option key={sex.value} value={sex.label}>
                    {sex.value}
                  </option>
                ))}
              </Select>
            </Flex>

            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Ville
              </Box>
              <Select
                placeholder="Ville"
                name="town"
                onChange={(e) => setChat({ ...cat, sex: e.target.value })}
              >
                {TOWNS.map((town) => (
                  <option key={town.value} value={town.label}>
                    {town.value}
                  </option>
                ))}
              </Select>
            </Flex>
          </SimpleGrid>

          <Flex flexDir="column" mt="1em">
            <Box fontSize="1rem" fontWeight="semibold">
              Description
            </Box>
            <Textarea
              placeholder="Description"
              value={cat.description}
              onChange={(e) => setChat({ ...cat, age: e.target.value })}
            />
          </Flex>
        </Flex>
      </Flex>
      <Button
        colorScheme="blue"
        onClick={isEdit ? () => onEdit(cat.id) : () => onAdopt(cat?.id)}
        mx="1em  auto 0 auto"
        display="flex"
        w="50%"
      >
        {isEdit ? "Modifier" : "Adopter"}
      </Button>
    </Flex>
  );
};
