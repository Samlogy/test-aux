import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import fetechRequest from "../lib/api";
import storage from "../lib/storage";
import useActionStore, { INIT_CAT } from "../store/useActionStore";
import {
  CustomModal,
  HandleImage,
  InputField,
  SelectField,
  TextField,
} from "./";
import { ICat } from "../lib/interfaces";

interface ICatAddFormProps {
  onClose: () => void;
  isOpen: boolean;
  setCatsList: React.Dispatch<React.SetStateAction<ICat[]>>;
}

type ImageType = { url: string; file: File | null };

export default function CatAddEdit({
  isOpen,
  onClose,
  setCatsList,
}: ICatAddFormProps) {
  const currentCat = useActionStore((state) => state.cat);
  const setCat = useActionStore((state) => state.setCat);

  const [chat, setChat] = useState(INIT_CAT);
  const [image, setImage] = useState<ImageType>({
    url: "",
    file: null,
  });

  const onCloseAddEdit = () => {
    onClose();
    setCat(INIT_CAT);
  };

  const constants = useMemo(() => storage.getStorage("consts--chadopt"), []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append("image", image.file);
      Object.keys(chat).map((key) => {
        if (key === "id" || key === "popularity") return;
        formData.append(key, chat[key]);
      });

      if (chat?.id) {
        const data = await fetechRequest(
          "PUT",
          `cat/${chat?.id}`,
          formData,
          true
        );
        setCatsList((prev) =>
          prev.map((c) => {
            if (c.id === currentCat.id) {
              return data;
            }
            return c;
          })
        );
      } else {
        const data = await fetechRequest("POST", `cat`, formData, true);
        setCatsList((prev) => [data, ...prev]);
      }

      // onCloseAddEdit();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat({ ...chat, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setChat(currentCat);

    const BASE_URL = "http://localhost:3001/" + currentCat.picture;
    console.log(BASE_URL, currentCat.picture);

    setImage({
      url: currentCat.picture.includes("http") ? currentCat.picture : BASE_URL,
      file: null,
    });
  }, [currentCat]);

  console.log("image: ", image);

  const Body = (
    <Flex flexDir="column">
      <Flex justifyContent="center">
        <Flex flexDir="column">
          <HandleImage label="Photo" image={image} setImage={setImage} />
          <SimpleGrid columns={2} spacing={1}>
            <InputField
              placeholder="Nom"
              value={chat?.name}
              label="Nom"
              name="name"
              autoComplete="on"
              onChange={onChange}
            />
            <InputField
              type="number"
              placeholder="Age"
              value={chat?.age}
              label="Age"
              name="age"
              autoComplete="on"
              onChange={onChange}
            />

            <SelectField
              placeholder="Statut"
              name="status"
              onChange={onChange}
              value={chat?.status}
              label="Status"
              autoComplete="on"
            >
              {constants.status.map((status, idx) => (
                <option key={idx} value={status.value}>
                  {status.label}
                </option>
              ))}
            </SelectField>

            <SelectField
              placeholder="Sexe"
              name="sex"
              onChange={onChange}
              value={chat?.sex}
              label="Sexe"
              autoComplete="on"
            >
              {constants.genders.map((gender, idx) => (
                <option key={idx} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </SelectField>

            <SelectField
              placeholder="Race"
              name="race"
              onChange={onChange}
              value={chat?.race}
              label="Race"
              autoComplete="on"
            >
              {constants.races.map((race, idx) => (
                <option key={idx} value={race.value}>
                  {race.label}
                </option>
              ))}
            </SelectField>

            <SelectField
              placeholder="Ville"
              name="town"
              onChange={onChange}
              value={chat?.town}
              label="Ville"
              autoComplete="on"
            >
              {constants.towns.map((town, idx) => (
                <option key={idx} value={town.value}>
                  {town.label}
                </option>
              ))}
            </SelectField>
          </SimpleGrid>

          <TextField
            placeholder="Description"
            value={chat?.description}
            name="description"
            label="Description"
            onChange={onChange}
            autoComplete="on"
          />
        </Flex>
      </Flex>
      <Button
        bgColor="accent.1"
        color="white"
        _hover={{
          bg: "accent.2",
        }}
        onClick={onSubmit}
        display="flex"
        w="50%"
        m="1em auto 0 auto"
      >
        {chat?.id ? "Modifier" : "Ajouter"}
      </Button>
    </Flex>
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onCloseAddEdit}
      body={Body}
      size={["sm", "", "lg"]}
    />
  );
}
