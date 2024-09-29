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
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Table, createColumn } from "react-chakra-pagination";
import { CgAdd, CgOptions } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { CatAddEdit, CatDelete, CatDetails, Layout, View } from "../components";
import fetechRequest from "../lib/api";
import { ICat } from "../lib/interfaces";
import useAction from "../store/useActionStore";
import AdoptionRequestList from "../components/AdoptionRequestList";
import storage from "../lib/storage";


interface ICatsList {
  data: ICat[];
  isLoading: boolean;
}

export default function AdminList() {
  const [catsList, setCatsList] = useState<ICatsList>({
    data: [],
    isLoading: false,
  });
  const [filters, setFilters] = useState({
    status: "all",
    race: "",
    age: "",
    gender: "",
    town: "",
  });

  const CONSTANTS = useMemo(() => storage.getStorage("consts--chadopt"), [])

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

  const onReset = () => {
    setFilters({
      status: "all",
      race: "",
      age: "",
      gender: "",
      town: "",
    });
  };
  const onFilter = () => {
    return catsList.data.filter(
      (cat: ICat) =>
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
  const onLoadCats = async (page = 1) => {
    setCatsList({ ...catsList, isLoading: true });
    const { data, pagination: paginate } = await fetechRequest(
      "GET",
      `cat?page=${page}&size=2`
    );
    setCatsList({ data, isLoading: false });
  };

  const closeAdoptReqs = () => {
    actions.setAdoptionList(false);
  };
  const closeEdit = () => {
    if (state.edit || state.add) {
      actions.setEdit(false);
      actions.setAdd(false);
    }
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

  useEffect(() => {
    onLoadCats();
  }, []);

  if (catsList.isLoading)
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
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              {CONSTANTS?.status.map((s:any) => {
               return <option value={s.value}>{s.label}</option>
              })}
            </select>
            <select
              value={filters.race}
              onChange={(e) => setFilters({ ...filters, race: e.target.value })}
            >
              <option value="">Race</option>
              {CONSTANTS?.races.map((g) => {
               return <option value={g.value}>{g.label}</option>
              })}
            </select>
            <select
              value={filters.gender}
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
            >
              <option value="">Gender</option>
              {CONSTANTS?.genders.map((g) => {
               return <option value={g.value}>{g.label}</option>
              })}
            </select>
            <select
              value={filters.town}
              onChange={(e) => setFilters({ ...filters, town: e.target.value })}
            >
              <option value="">Villes</option>
              {CONSTANTS?.towns.map((t) => {
               return <option value={t.value}>{t.label}</option>
              })}
            </select>
            <input
              placeholder="Age"
              type="number"
              value={filters.age}
              onChange={(e) => setFilters({ ...filters, age: e.target.value })}
            />
            <Button
              _hover={{
                bg: "accent.2",
              }}
              bgColor="accent.1"
              color="white"
              w="10em"
              onClick={onFilter}
            >
              Appliquer
            </Button>
            <Button bgColor="white" color="accent.1" onClick={onReset} w="6em">
              Reset
            </Button>
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
            onClick={() => actions.setAdd(true)}
            icon={<CgAdd size={26} />}
          />

          <Table
            colorScheme="oange"
            emptyData={{
              icon: FiUser,
              text: "Aucune requête d'adoption !",
            }}
            totalRegisters={12}
            onPageChange={(p) => onLoadCats(p)}
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

      <View cond={state.edit || state.add}>
        <CatAddEdit
          isOpen={state.edit || state.add}
          onClose={closeEdit}
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
