import {
  Avatar,
  Button,
  Flex, HStack, Menu,
  MenuButton,
  MenuItem,
  MenuList, Spinner, Stack, Tag,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Table, createColumn } from "react-chakra-pagination";
import { FiChevronDown, FiUser } from "react-icons/fi";
import {
  CatAddEdit,
  CatDelete,
  CatDetails,
  Layout,
  View
} from "../components";
import fetechRequest from "../lib/api";
import useAction from "../store/useActionStore";
import useFavCatstore from "../store/useFavCatsStore";
import useFilterStore from "../store/useFilterStore";
import { ICat } from "../lib/interfaces";



const data: ICat[] = [
  {
    id: 1,
    name: "Whiskers",
    age: 2,
    race: "tabby",
    town: "paris",
    status: "ADOPTABLE",
    gender: "MALE",
    picture: "https://robohash.org/undevelitdolor.png?size=50x50&set=set1",
    isReqAdopt: false,
    description: "description"
  },
  {
    id: 2,
    name: "Mittens",
    age: 3,
    race: "calico",
    town: "marseille",
    status: "ADOPTABLE",
    gender: "FEMALE",
    picture: "https://robohash.org/undevelitdolor.png?size=50x50&set=set1",
    isReqAdopt: false,
    description: "description"
  },
  {
    id: 3,
    name: "Shadow",
    age: 1,
    race: "domestic_shorthair",
    town: "lyon",
    status: "ADOPTABLE",
    gender: "MALE",
    picture: "https://robohash.org/undevelitdolor.png?size=50x50&set=set1",
    isReqAdopt: false,
    description: "description"
  },
  {
    id: 4,
    name: "Cupcake",
    age: 1,
    race: "persian",
    town: "nice",
    status: "ADOPTABLE",
    gender: "FEMALE",
    picture: "https://robohash.org/undevelitdolor.png?size=50x50&set=set1",
    isReqAdopt: false,
    description: "description"
  },
];
export default function AdminList() {
  const [cats, setCats] = useState({ all: data, adoptions: [] });
  const [currentTab, setCurrentTab] = useState("all");

  const actions = useAction((state) => state.actions);
  const state = useAction((state) => state.state);
  const setCat = useAction((state) => state.setCat);
  

  const catStatus = (cat: ICat) => {
    return cat.status === "ADOPTABLE"
      ? "Disponible"
      : cat.status === "PENDING"
      ? "En cours"
      : cat.status === "ADOPTED"
      ? "Adopté"
      : "";
  };
  const catGender = (cat: ICat) => {
    return cat.gender === "MALE" ? "Mâle" : "Femelle";
  };
  const catFilterStatus = (type: string) => {
    return type === "all"
      ? cats.all
      : type === "adoptions"
      ? cats.adoptions
      : [];
  };

  // const onDelete = (id: number) => {
  //   console.log("delete cat!");
  // };
  // const onEdit = (cat: ICat) => {
  //   console.log("edit cat!");
  // };
  // const onDetails = (cat: ICat) => {
  //   console.log("details cat!");
  // };

  const onEdit = (cat: ICat) => {
    actions.setEdit(true);
    setCat(cat)
    console.log(cat)
  };
  const onDelete = (id: number) => {
    actions.setDelete(true);
    const currentCat = cats.all.find(c => c.id == id)
    console.log(currentCat)
  };
  const onDetails = (cat:ICat) => {
    actions.setDetails(!state.details);
    setCat(cat)
    console.log(cat)
  };

  const tableData = catFilterStatus("all").map((cat: ICat) => ({
    name: (
      <Flex align="center">
        <Avatar name={cat.name} src={cat.picture} size="md" mr="4" />
        <Text>{cat.name}</Text>
      </Flex>
    ),
    race: cat.race,
    gender: catGender(cat),
    town: cat.town,
    status: catStatus(cat),
    action: (
      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onDelete(cat.id)}>Delete</MenuItem>
          <MenuItem onClick={() => onEdit(cat)}>Edit</MenuItem>
          <MenuItem onClick={() => onDetails(cat)}>Détails</MenuItem>
        </MenuList>
      </Menu>
    ),
  }));

  // Need pass type of `tableDate` for ts autocomplete
  const columnHelper = createColumn<(typeof tableData)[0]>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("town", {
      cell: (info) => info.getValue(),
      header: "Town",
    }),
    columnHelper.accessor("race", {
      cell: (info) => info.getValue(),
      header: "Race",
    }),
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: "Status",
    }),
    columnHelper.accessor("gender", {
      cell: (info) => info.getValue(),
      header: "Gender",
    }),
    columnHelper.accessor("action", {
      cell: (info) => info.getValue(),
      header: "",
    }),
  ];

  const onFilter = (type: string) => {
    setCurrentTab(type);

  }





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

  // const userData = useMemo(() => storage.getStorage("auth--chadopt")?.user, []);

  const isFav = useFavCatstore((state) => state.isFav);
  const catsFav = useFavCatstore((state) => state.cats);

  // const filters = useFilterStore((state) => state.filters);
  // const setFilters = useFilterStore((state) => state.setFilters);

  const [catsList, setCatsList] = useState<any>([]);
  const [isOpen, setOpen] = useState(false);

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

    setLoading(true);
    setCatsList(data);
    setPagination(pagination);
    setLoading(false);
  };

  useEffect(() => {
    onLoadCats();
  }, [isFav, catsFav, pagination.page]);

  const tabStyle: any = {
    active: {
      bgColor: "accent.1",
      color: "white",
      hover: "accent.2"
    }, inactive: {
      bgColor: "white",
      color: "accent.1",
      hover: "accent.2"
    }
  }

  if (isLoading)
    return <Spinner color="brown" thickness="4px" speed="0.65s" size="xl" />;
  return (
    <>
      <Layout isHeaderVisible>
        <Stack
          m="0 auto"
          spacing="8"
          boxShadow={"xl"}
          p="1em"
          rounded="xl"
          bg="white"
        >
          <Flex justifyContent="space-between">
          <HStack spacing={4}>
            {["all", "adoptions"].map((v) => (
              <Tag
                size={"md"}
                key={v}
                bgColor={v === currentTab ? tabStyle["active"].bgColor : tabStyle['inactive'].bgColor}
                color={v === currentTab ? tabStyle["active"].color : tabStyle['inactive'].color}
                _hover={{
                  bg: v === currentTab ? tabStyle["active"].hover : tabStyle['inactive'].hover,
                  cursor: "pointer"
                }}
                textTransform={"capitalize"}
                onClick={() => onFilter(v)}
              >
                {v}
              </Tag>
            ))}
          </HStack>


            <Button
              bgColor="accent.1"
              color="white"
              display="flex"
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

          </Flex>

          <Table
            colorScheme="blue"
            // Fallback component when list is empty
            emptyData={{
              icon: FiUser,
              text: "Aucun chat n'a été ajouté !",
            }}
            totalRegisters={12}
            onPageChange={(page) => console.log(page)}
            columns={columns}
            data={tableData}
          />
        </Stack>
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


