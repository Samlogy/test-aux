import {
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsFilterLeft } from "react-icons/bs";
import {
  Card,
  CatAddForm,
  CustomDrawer,
  CustomModal,
  DisplayFilters,
  Filter,
  Layout,
  Pagination,
  View,
} from "../components";
import api from "../lib/api";
import useQueryCat from "../lib/hooks/useQueryCat";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";

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
export default function CatsList() {
  // const {
  //   isLoading,
  //   isError,
  //   data: catsList,
  // } = useQueryCat(
  //   "cats-list",
  //   api.getData("https://jsonplaceholder.typicode.com/todos")
  // );

  // const [filterList, setFilterList] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isOpenAdd, setOpenAdd] = useState(false);

  const [catsList, setCatsList] = useState(data);

  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
  }) as boolean;

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 2;
  const NUMBER_ITEMS = data.length;

  const { filters, setFilters } = useFilter();

  console.log("filters: ", filters);

  // if (isLoading) return <h1>Loading....</h1>;
  // if (isError) return <h1>Error loading data!!!</h1>;

  return (
    <>
      <Layout isHeaderVisible>
        <Flex>
          <Heading fontSize="1.5rem" mb="2rem" textTransform={"capitalize"}>
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
        </Flex>

        <Flex flexDir={"row"} justifyContent="space-between">
          <Flex flexDir={"column"} flexGrow="1" flexBasis="15%">
            <View cond={!isMobile} w="90%">
              <Filter
                setCatsList={setCatsList}
                setFilters={setFilters}
                filters={filters}
              />
            </View>

            <View cond={isMobile}>
              <IconButton
                bg={"gray.100"}
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
                body={
                  <Filter
                    setCatsList={setCatsList}
                    setFilters={setFilters}
                    filters={filters}
                  />
                }
              />
            </View>
          </Flex>

          <Flex flexDir={"column"} flexGrow="2" flexBasis="80%">
            <View cond={catsList?.length > 0}>
              <DisplayFilters filters={filters} isMobile={isMobile} />

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

            <View cond={catsList?.length === 0}>
              <Text> Il n' y a aucun chat qui correspond à ses filtres </Text>
            </View>
          </Flex>
        </Flex>

        <View cond={NUMBER_ITEMS > PAGE_SIZE}>
          <Pagination
            currentPage={currentPage}
            totalCount={NUMBER_ITEMS}
            pageSize={PAGE_SIZE}
            onPageChange={(page: number) => setCurrentPage(page)}
            isMobile={isMobile}
          />
        </View>
      </Layout>

      <CustomModal
        isOpen={isOpenAdd}
        onClose={() => setOpenAdd(false)}
        header="Ajouter un chat"
        body={<CatAddForm onClose={() => setOpenAdd(false)} />}
      />
    </>
  );
}

type IFilters = {
  name: string;
  status: string;
  town: string;
  isFavourite: boolean;
};
const useFilter = () => {
  const [filters, setFilters] = useState<IFilters>({
    name: "",
    status: "",
    town: "",
    isFavourite: false,
  });

  useEffect(() => {
    const storedFilters = storage.getStorage("filters--chadopt") || {};
    setFilters(storedFilters);
  }, []);

  return { filters, setFilters };
};
