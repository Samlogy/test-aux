import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import {
  Card,
  CustomDrawer,
  CustomModal,
  Filter,
  Layout,
  View,
} from "../components";
import { ICat } from "../lib/interfaces";

const data = [
  {
    id: 1,
    name: "Chat chat",
    picture:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 1,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
    race: "minou",
    town: "bordeaux",
    status: "Adoptable",
    sex: "femelle",
  },
  {
    id: 2,
    name: "Chat chat",
    picture:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 1,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
    race: "minou",
    town: "bordeaux",
    status: "Adoptable",
    sex: "Mâle",
  },
  {
    id: 3,
    name: "Chat chat",
    picture:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 1,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
    race: "minou",
    town: "bordeaux",
    status: "Adoptable",
    sex: "femelle",
  },
  {
    id: 4,
    name: "Chat chat",
    picture:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 1,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
    race: "minou",
    town: "bordeaux",
    status: "Adoptable",
    sex: "Mâle",
  },
  {
    id: 5,
    name: "Chat chat",
    picture:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 1,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
    race: "minou",
    town: "bordeaux",
    status: "Adoptable",
    sex: "femelle",
  },
  {
    id: 6,
    name: "Chat chat",
    picture:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 1,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
    race: "minou",
    town: "bordeaux",
    status: "Adoptable",
    sex: "Mâle",
  },
];

const TOWNS = [];
const RACES = [];
const SEX = [];
const STATUS = [];

export default function CatsList() {
  // const queryClient = useQueryClient();

  // Queries
  // const query = useQuery({ queryKey: ["cats-list"], queryFn: getCastsList });
  // console.log("data: ", query);

  const filterData = [];
  const isMobile = true;
  const NUMBER_ITEM_PER_PAGE = 1;

  const [isOpen, setOpen] = useState(false);

  const btnRef = useRef();

  const [catsList, setCatsList] = useState([]);

  const [isOpenAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    setCatsList(data);
  }, []);

  return (
    <>
      <Layout isHeaderVisible>
        <Heading fontSize="1.5rem" mb="2rem" textTransform={"uppercase"}>
          Nos Chats
        </Heading>
        <Button
          colorScheme="blue"
          ml="auto"
          display="flex"
          onClick={() => setOpenAdd(true)}
        >
          Ajouter un Chat
        </Button>

        <Flex flexDir={"row"} justifyContent="space-between">
          <Flex flexDir={"column"}>
            <View cond={!isMobile} w="90%">
              <Filter setCatsList={setCatsList} />
            </View>

            <View cond={isMobile}>
              <IconButton
                bg={"gray.300"}
                _focus={{ outline: "none" }}
                aria-label="trigger-filter"
                icon={<BsFilterLeft size={24} />}
                onClick={() => setOpen(true)}
              />
              <CustomDrawer
                title="Filtres"
                isOpen={isOpen}
                size="sm"
                onClose={() => setOpen(false)}
                body={<Filter setCatsList={setCatsList} />}
              />
            </View>
          </Flex>

          <Flex flexDir={"column"}>
            <View cond={data?.length > 0}>
              <DisplayFilters filters={filterData} isMobile={isMobile} />

              <Flex
                flexDir="row"
                flexWrap="wrap"
                justifyContent={"center"}
                flexBasis="75%"
              >
                {catsList?.map((cat: ICat) => (
                  <Card key={cat.id} cat={cat} />
                ))}
              </Flex>
            </View>

            <View cond={data?.length === 0}>
              <Text> Il n' y a aucun chat qui correspond à ses filtres </Text>
            </View>
          </Flex>
        </Flex>

        {/* <SweetPagination
        currentPageData={setCatsList}
        dataPerPage={NUMBER_ITEM_PER_PAGE}
        getData={catsList}
        navigation={true}
      /> */}
      </Layout>
      <CustomModal
        isOpen={isOpenAdd}
        setOpen={() => setOpenAdd(false)}
        header="Ajouter un chat"
        body={<CatAddForm />}
        footer={<></>}
      />
    </>
  );
}

interface IDisplayFilters {
  filters: string[];
  isMobile: boolean;
}
function DisplayFilters({ filters, isMobile }: IDisplayFilters) {
  return (
    <Flex
      flexDir="row"
      flexWrap="wrap"
      justify="flex-start"
      mb="1em"
      ml={isMobile ? "1em" : "0"}
    >
      {filters.map((filter: string) => (
        <Box
          key={filter}
          as="span"
          bg="accent_3"
          color="white"
          borderRadius="10px"
          p=".2em"
          fontSize=".9rem"
          mb=".5em"
          mr=".25em"
        >
          {filter}
        </Box>
      ))}
    </Flex>
  );
}

function CatAddForm() {
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
  return (
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
              {STATUS.map((status: any) => (
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
              {RACES.map((race: any) => (
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
              {SEX.map((sex: any) => (
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
              onChange={(e) => setCat({ ...cat, sex: e.target.value })}
            >
              {TOWNS.map((town: any) => (
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
            onChange={(e) => setCat({ ...cat, age: e.target.value })}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
