import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../lib/api";

const TOWNS = [];
const RACES = [];
const GENDERS = [];
const STATUS = [];

export default function CatAddForm({ onClose }: any) {
  const [cat, setCat] = useState({
    name: "",
    sex: "",
    race: "",
    status: "",
    description: "",
    town: "",
    age: "",
    picture: "",
  });

  async function onAdd() {
    onClose();
    await api.postData("/cat", cat);
  }
  return (
    <Flex flexDir="column">
      <Flex>
        <Flex flexDir="column">
          <SimpleGrid columns={2} spacing={1}>
            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Photo
              </Box>
              <Input
                type="file"
                placeholder="Photo"
                value={cat.picture}
                onChange={(e) => console.log("file: ", e)}
              />
            </Flex>
            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Nom
              </Box>
              <Input
                placeholder="Nom"
                value={cat.name}
                onChange={(e) => setCat({ ...cat, name: e.target.value })}
              />
            </Flex>

            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Age
              </Box>
              <Input
                placeholder="Age"
                value={cat.age}
                onChange={(e) => setCat({ ...cat, age: e.target.value })}
              />
            </Flex>

            <Flex flexDir="column">
              <Box fontSize="1rem" fontWeight="semibold">
                Race
              </Box>
              <Select
                placeholder="Statut"
                value={cat.status}
                onChange={(e) => setCat({ ...cat, status: e.target.value })}
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
                onChange={(e) => setCat({ ...cat, race: e.target.value })}
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
                onChange={(e) => setCat({ ...cat, sex: e.target.value })}
              >
                {GENDERS.map((gender) => (
                  <option key={gender.value} value={gender.label}>
                    {gender.value}
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
                onChange={(e) => setCat({ ...cat, town: e.target.value })}
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
              onChange={(e) => setCat({ ...cat, description: e.target.value })}
            />
          </Flex>
        </Flex>
      </Flex>
      <Button
        colorScheme="blue"
        onClick={onAdd}
        display="flex"
        w="50%"
        m="1em auto 0 auto"
      >
        Ajouter un chat
      </Button>
    </Flex>
  );
}
