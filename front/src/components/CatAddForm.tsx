import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import storage from "../lib/storage";

// const TOWNS = [];
// const RACES = [];
// const GENDERS = [];
// const STATUS = [];

export default function CatAddForm({ onClose }: { onClose: () => void }) {
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
  const [image, setImage] = useState<File | null>(null);

  const [constants, setConstants] = useState({
    towns: [],
    races: [],
    genders: [],
    status: [],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();

      formData.append("image", image);
      Object.keys(cat).map((key) => formData.append(key, cat[key]));

      // await api.postData("/cat", formData, true);
      onClose();
    }
  };

  useEffect(() => {
    const data = storage.getStorage("constants--chadopt");
    setConstants(data);
  }, []);

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
                accept="image/*"
                onChange={handleImageChange}
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
                {constants.status.map((status) => (
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
                {constants.races.map((race) => (
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
                {constants.genders.map((gender) => (
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
                {constants.towns.map((town) => (
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
        bgColor="accent.1"
        color="white"
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
