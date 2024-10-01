import {
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import {
  Card,
  CatDetails,
  CustomDrawer,
  DisplayFilters,
  Filter,
  Layout,
  Pagination,
  View
} from "../components";
import fetechRequest from "../lib/api";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";
import useAction from "../store/useActionStore";
import useFavCatstore from "../store/useFavCatsStore";
import useFilterStore from "../store/useFilterStore";

export default function CatsList() {
  const actions = useAction((state) => state.actions);
  const state = useAction((state) => state.state);

  const [isLoading, setLoading] = useState(false);

  const isFav = useFavCatstore((state) => state.isFav);
  const catsFav = useFavCatstore((state) => state.cats);

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  // const user = useAuthStore(state => state.user)
  const user = useMemo(() => storage.getStorage("auth--chadopt").user, []);

  const [catsList, setCatsList] = useState<ICat[]>([]);
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

  const fetchCats = useCallback(async () => {
    setLoading(true);
    const endpoint = isFav
      ? `cat/favorite/user/${user.id}`
      : `cat?page=${pagination.page}&size=10`;

    const { data, pagination: paginate } = await fetechRequest("GET", endpoint);
    
    console.log('pagination => ', paginate, catsFav);

    if (isFav) setCatsList(catsFav);
    else setCatsList(data);

    setPagination({
      pages: paginate.pages,
      page: paginate.page,
    });

    setLoading(false);
  }, [isFav, pagination.page, catsFav]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  // console.log('catsList => ', catsList)

  if (isLoading)
    return <Spinner color="brown" thickness="4px" speed="0.65s" size="xl" />;
  return (
    <>
      <Layout isHeaderVisible>
        <Flex>
          <Heading fontSize="1.5rem" mb="2rem" textTransform={"capitalize"}>
            Nos Chats
          </Heading>
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
            // isMobile={isMobile}
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
    </>
  );
}
