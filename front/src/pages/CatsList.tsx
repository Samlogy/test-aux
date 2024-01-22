import {
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
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
export default function CatsList() {
  // const queryClient = useQueryClient();

  // Queries
  // const query = useQuery({ queryKey: ["cats-list"], queryFn: getCastsList });
  // console.log("data: ", query);

  const [filterList, setFilterList] = useState([]);

  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });

  const [isOpen, setOpen] = useState(false);

  const btnRef = useRef();

  const [catsList, setCatsList] = useState([]);

  const [isOpenAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    setCatsList(data);
  }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 1;
  const NUMBER_ITEMS = catsList.length;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return catsList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <Layout isHeaderVisible>
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

        <Flex flexDir={"row"} justifyContent="space-between">
          <Flex flexDir={"column"}>
            <View cond={!isMobile} w="90%">
              <Filter setCatsList={setCatsList} setFilterList={setFilterList} />
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
                body={
                  <Filter
                    setCatsList={setCatsList}
                    setFilterList={setFilterList}
                  />
                }
              />
            </View>
          </Flex>

          <Flex flexDir={"column"}>
            <View cond={data?.length > 0}>
              <DisplayFilters filters={filterList} isMobile={isMobile} />

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
        footer={<></>}
      />
    </>
  );
}
