import {
  Avatar,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Table, createColumn } from "react-chakra-pagination";
import { CgOptions, CgAdd } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { CatAddEdit, CatDelete, CatDetails, Layout, View } from "../components";
import fetechRequest from "../lib/api";
import { ICat } from "../lib/interfaces";
import useAction from "../store/useActionStore";

const DATA: ICat[] = [
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
    description: "description",
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
    description: "description",
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
    description: "description",
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
    description: "description",
  },
];

export default function AdminList() {
  // const [currentTab, setCurrentTab] = useState("all");
  const [catsList, setCatsList] = useState<ICat[]>([]);
  const [filters, setFilters] = useState({
    status: "all",
    race: "",
    age: "",
    gender: "",
    town: "",
  });

  const actions = useAction((state) => state.actions);
  const state = useAction((state) => state.state);
  const setCat = useAction((state) => state.setCat);

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
  });

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

  const onReset = () => {
    setFilters({
      status: "all",
      race: "",
      age: "",
      gender: "",
      town: "",
    })
  }
  const onFilter = () => {
    return catsList.filter(
      (cat) =>
        (filters.status === "all" || cat.status === filters.status) &&
        (!filters.race || cat.race.includes(filters.race)) &&
        (!filters.age || cat.age === Number(filters.age)) &&
        (!filters.gender || cat.gender === filters.gender) &&
        (!filters.town || cat.town.includes(filters.town))
    );
  };
  const onEdit = (cat: ICat) => {
    actions.setEdit(true);
    setCat(cat);
  };
  const onDelete = (cat: ICat) => {
    actions.setDelete(true);
    setCat(cat);
  };
  const onDetails = (cat: ICat) => {
    actions.setDetails(!state.details);
    setCat(cat);
  };
  const onListAdoptions = (cat: ICat) => {
    actions.setAdoptionList(true);
    setCat(cat);
  };

  const closeAdoptReqs = () => {
    actions.setAdoptionList(false);
  };

  const tableData = onFilter().map((cat: ICat) => ({
    name: (
      <Flex align="center">
        <Avatar name={cat.name} src={cat.picture} size="md" mr="4" />
        <Text>{cat.name}</Text>
      </Flex>
    ),
    race: cat.race,
    age: cat.age,
    gender: catGender(cat),
    town: cat.town,
    status: catStatus(cat),
    action: (
      <Menu>
        <MenuButton as={IconButton} icon={<CgOptions />}></MenuButton>
        <MenuList>
          <MenuItem onClick={() => onDelete(cat)}>Delete</MenuItem>
          <MenuItem onClick={() => onEdit(cat)}>Edit</MenuItem>
          <MenuItem onClick={() => onDetails(cat)}>Détails</MenuItem>
          <MenuItem onClick={() => onListAdoptions(cat)}>Adoptions</MenuItem>
        </MenuList>
      </Menu>
    ),
  }));
  const columnHelper = createColumn<(typeof tableData)[0]>();
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("race", {
      cell: (info) => info.getValue(),
      header: "Race",
    }),
    columnHelper.accessor("age", {
      cell: (info) => info.getValue(),
      header: "Age",
    }),
    columnHelper.accessor("gender", {
      cell: (info) => info.getValue(),
      header: "Gender",
    }),
    columnHelper.accessor("town", {
      cell: (info) => info.getValue(),
      header: "Town",
    }),

    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: "Status",
    }),
    columnHelper.accessor("action", {
      cell: (info) => info.getValue(),
      header: "Actions",
    }),
  ];

  // const onFilter = (type: string) => setCurrentTab(type);

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

  const onLoadCats = async () => {
    setLoading(true);
    const { data, pagination: paginate } = await fetechRequest(
      "GET",
      `cat?page=${pagination.page}&size=2`
    );

    setLoading(false);

    setCatsList(DATA);
    setPagination({ pages: paginate.pages, page: paginate.page });

    // setLoading(true);
    // setCatsList(data);
    // setPagination(pagination);
    // setLoading(false);
  };

  useEffect(() => {
    onLoadCats();
  }, [pagination.page]);

  const tabStyle: any = {
    active: {
      bgColor: "accent.1",
      color: "white",
      hover: "accent.2",
    },
    inactive: {
      bgColor: "white",
      color: "accent.1",
      hover: "accent.2",
    },
  };
  
  // console.log("adopt; ", onFilter());

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
            <HStack justifyContent="center" spacing={4}>
              <form>
              <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="all">All</option>
                  <option value="ADOPTABLE">Available</option>
                  <option value="ADOPTED">Adopted</option>
                  <option value="PENDING">Pending</option>
                </select>
                <select
                  value={filters.race}
                  onChange={(e) =>
                    setFilters({ ...filters, race: e.target.value })
                  }
                >
                  <option value="">Race</option>
                </select>
                <select
                  value={filters.gender}
                  onChange={(e) =>
                    setFilters({ ...filters, gender: e.target.value })
                  }
                >
                  <option value="">Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <input
                  placeholder="Age"
                  type="number"
                  value={filters.age}
                  onChange={(e) =>
                    setFilters({ ...filters, age: e.target.value })
                  }
                />                
                <input
                  placeholder="Town"
                  value={filters.town}
                  onChange={(e) =>
                    setFilters({ ...filters, town: e.target.value })
                  }
                />
                <Button
                  _hover={{
                    bg: "accent.2",
                  }}
                  bgColor="accent.1"
                  color="white"
                  onClick={onFilter}
                >
                  Appliquer
                </Button>
                <Button
                  bgColor="white"
                  color="accent.1"
                  onClick={onReset}
                >
                  Reset
                </Button>
              </form>
            </HStack>

            <IconButton
              aria-label="ajouter un chat"
              bgColor="accent.1"
              color="white"
              display="flex"
              marginLeft="auto"
              _hover={{
                bg: "accent.2",
              }}
              onClick={() => 
                actions.setAdd(true)
              }
              icon={<CgAdd size={26} />}
            />


          <Table
            colorScheme="teal"
            emptyData={{
              icon: FiUser,
              text: "Aucune requête d'adoption !",
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

      <View cond={state.adoption.list}>
        <AdoptionRequestList
          isOpen={state.adoption.list}
          onClose={closeAdoptReqs}
        />
      </View>
    </>
  );
}

const AdoptionRequestList = ({ isOpen, onClose }: any) => {
  const USERS = [
    {
      id: 1,
      name: "sam",
      date: "2024-05-22",
      picture:
        "https://robohash.org/undevelitdolor.png?size=50x50&amp;set=set1",
    },
    {
      id: 2,
      name: "sam",
      date: "2024-05-22",
      picture:
        "https://robohash.org/undevelitdolor.png?size=50x50&amp;set=set1",
    },
    {
      id: 3,
      name: "sam",
      date: "2024-05-22",
      picture:
        "https://robohash.org/undevelitdolor.png?size=50x50&amp;set=set1",
    },
    {
      id: 4,
      name: "sam",
      date: "2024-05-22",
      picture:
        "https://robohash.org/undevelitdolor.png?size=50x50&amp;set=set1",
    },
    {
      id: 5,
      name: "sam",
      date: "2024-05-22",
      picture:
        "https://robohash.org/undevelitdolor.png?size=50x50&amp;set=set1",
    },
    {
      id: 6,
      name: "sam",
      date: "2024-05-22",
      picture:
        "https://robohash.org/undevelitdolor.png?size=50x50&amp;set=set1",
    },
  ];

  const [adoptionsReq, setAdoptionReq] = useState({
    data: USERS,
    isLoading: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
  });

  const cat = useAction((state) => state.cat);

  const onAcceptAdoption = async (userId: number) => {
    // actions.setAdoptionAccept(true);
    // call api
    console.log(cat.id, userId);
    await fetechRequest(
      "GET",
      `cat/adopt/${cat.id}/user/${userId}?page=${pagination.page}&size=2`
    );
  };
  const onDenyAdoption = async (userId: number) => {
    // actions.setAdoptionDeny(true);
    // call api
    console.log(cat.id, userId);
    await fetechRequest(
      "DELETE",
      `cat/adopt/${cat.id}/user/${userId}?page=${pagination.page}&size=2`
    );
  };
  const onLoadAdoptionRequets = async () => {
    setAdoptionReq({ ...adoptionsReq, isLoading: true });
    const { data, pagination: paginate } = await fetechRequest(
      "GET",
      `cat/adopt/${cat.id}?page=${pagination.page}&size=2`
    );
    setAdoptionReq({ ...adoptionsReq, isLoading: false });

    setAdoptionReq(data);
    setPagination({ pages: paginate.pages, page: paginate.page });
  };

  const tableData = adoptionsReq.data.map((user: any) => ({
    name: (
      <Flex align="center">
        <Avatar name={user.name} src={user.picture} size="md" mr="4" />
        <Text>{user.name}</Text>
      </Flex>
    ),
    date: user.date,
    action: (
      <Menu>
        <MenuButton as={IconButton} icon={<CgOptions />}></MenuButton>
        <MenuList>
          <MenuItem onClick={() => onDenyAdoption(user.id)}>Deny</MenuItem>
          <MenuItem onClick={() => onAcceptAdoption(user.id)}>Accept</MenuItem>
        </MenuList>
      </Menu>
    ),
  }));

  const columnHelper = createColumn<(typeof tableData)[0]>();
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      header: "Race",
    }),
    columnHelper.accessor("action", {
      cell: (info) => info.getValue(),
      header: "Actions",
    }),
  ];

  useEffect(() => {
    // onLoadAdoptionRequets();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adoption List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {adoptionsReq.isLoading ? (
            <Spinner color="brown" thickness="4px" speed="0.65s" size="xl" />
          ) : (
            <Table
              colorScheme="brown"
              emptyData={{
                icon: FiUser,
                text: "Aucune requête pour ce chat !",
              }}
              totalRegisters={12}
              onPageChange={(page) => console.log(page)}
              columns={columns}
              data={tableData}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
