import {
  Button,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import {
  Card,
  CatAddEdit,
  CatDelete,
  CatDetails,
  CustomDrawer,
  DisplayFilters,
  Filter,
  Layout,
  Pagination,
  View,
} from "../components";
import fetechRequest from "../lib/api";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";
import useAction from "../store/useActionStore";
import useFavCatstore from "../store/useFavCatsStore";
import useFilterStore from "../store/useFilterStore";
import useApiRequest from "../lib/hooks/useApiRequest";

export default function CatsList() {
  const actions = useAction((state) => state.actions);
  const state = useAction((state) => state.state);

  const [isLoading, setLoading] = useState(false);

  const onCloseEdit = () =>
    state.edit
      ? actions.setEdit(false)
      : state.add
      ? actions.setAdd(false)
      : null;

  const isOpenEdit = (
    state.edit ? state.edit : state.add ? state.add : null
  ) as boolean;

  const userData = useMemo(() => storage.getStorage("auth--chadopt")?.user, []);

  const isFav = useFavCatstore((state) => state.isFav);
  const catsFav = useFavCatstore((state) => state.cats);

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const [catsList, setCatsList] = useState(isFav ? catsFav : []);
  const [isOpen, setOpen] = useState(false);

  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
  }) as boolean;

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
  });

  const onLoadCats = async () => {
    setLoading(true);
    const { data, pagination: paginate } = await fetechRequest(
      "GET",
      `cat?page=${pagination.page}`
    );

    setLoading(false);

    setCatsList(data);
    setPagination({ pages: paginate.pages, page: paginate.page });

    if (isFav) setCatsList(catsFav);
    if (!isFav) {
      setLoading(true);
      setCatsList(data);
      setPagination(pagination);
      setLoading(false);
    }
  };

  useEffect(() => {
    onLoadCats();
  }, [isFav, catsFav, pagination.page]);

  // console.log("List: ", catsList);

  if (isLoading)
    return <Spinner color="brown" thickness="4px" speed="0.65s" size="xl" />;
  return (
    <>
      <Layout isHeaderVisible>
        <Flex>
          <Heading fontSize="1.5rem" mb="2rem" textTransform={"capitalize"}>
            Nos Chats
          </Heading>

          <View cond={userData.isAdmin} display="flex" ml="auto">
            <Button
              bgColor="accent.1"
              color="white"
              _hover={{
                bg: "accent.2",
              }}
              onClick={() => {
                console.log("1");
                actions.setAdd(true);
              }}
            >
              Ajouter un Chat
            </Button>
          </View>
        </Flex>

        <Flex flexDir={"row"} justifyContent="space-between">
          <Flex flexDir={"column"} flexGrow="1" flexBasis="15%">
            <View cond={!isMobile} w="90%">
              <Filter
                setCatsList={setCatsList}
                setFilters={setFilters}
                filters={filters}
                setPagination={setPagination}
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
                    setPagination={setPagination}
                  />
                }
              />
            </View>
          </Flex>

          <Flex flexDir={"column"} flexGrow="2" flexBasis="80%">
            <DisplayFilters filters={filters} isMobile={isMobile} />
            <View cond={catsList?.length > 0}>
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

            <View
              cond={catsList?.length === 0}
              m="2em 0"
              textAlign="center"
              color="accent.1"
            >
              <Text>
                {isFav
                  ? "Il n' y a aucun chat en favoris !"
                  : "Il n' y a aucun chat qui correspond à ses filtres"}
              </Text>
            </View>
          </Flex>
        </Flex>

        <View cond={pagination.pages > 1}>
          <Pagination
            setPagination={setPagination}
            pagination={pagination}
            isMobile={isMobile}
          />
        </View>
      </Layout>

      <View cond={state.details}>
        <CatDetails
          isOpen={state.details}
          onClose={() => actions.setDetails(false)}
          setCatsList={setCatsList}
        />
      </View>

      <View cond={state.delete}>
        <CatDelete
          setCatsList={setCatsList}
          isOpen={state.delete}
          onClose={() => actions.setDelete(false)}
        />
      </View>

      <View cond={isOpenEdit}>
        <CatAddEdit
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          setCatsList={setCatsList}
        />
      </View>
    </>
  );
}
