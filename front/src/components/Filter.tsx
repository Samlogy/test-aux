import { Button, SimpleGrid } from "@chakra-ui/react";
import { useMemo } from "react";
import fetechRequest from "../lib/api";
import { generateQuery } from "../lib/functions";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";
import { IFilters } from "../store/useFilterStore";
import { InputField, SelectField } from "./";

interface IFilterProps {
  setCatsList: React.Dispatch<React.SetStateAction<ICat[]>>;
  filters: IFilters["filters"];
  setFilters: React.Dispatch<React.SetStateAction<IFilters["filters"]>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      totalItems: number;
      size: number;
      pages: number;
    }>
  >;
}

export default function Filter({
  setCatsList,
  filters,
  setFilters,
  setPagination,
}: IFilterProps) {
  const CONSTANTS = useMemo(() => storage.getStorage("consts--chadopt"), []);

  const onFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target == null) return;

    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const onReset = async () => {
    setFilters({ name: "", status: "", town: "" });
    // const res = await getData("cat");
    const res = await fetechRequest("GET", `cat`);
    setCatsList(res.data);
    setPagination(res.pagination);
  };
  const onSubmit = async () => {
    const query = generateQuery(filters);
    // const res = await getData(`cat/filter?${query}`);
    const res = await fetechRequest("GET", `cat/filter/${query}`);
    setCatsList(res.data);
    setPagination(res.pagination);
  };

  return (
    <SimpleGrid columns={1} spacing={4}>
      <InputField
        type="search"
        name="name"
        onChange={onFilter}
        value={filters.name}
        placeholder="Nom"
      />
      <SelectField
        placeholder="Ville"
        name="town"
        onChange={onFilter}
        value={filters.town}
      >
        {CONSTANTS?.towns.map((town, idx) => (
          <option key={idx} value={town.value}>
            {town.label}
          </option>
        ))}
      </SelectField>
      <SelectField
        placeholder="Statut"
        name="status"
        onChange={onFilter}
        value={filters.status}
      >
        {CONSTANTS?.status.map((status, idx) => (
          <option key={idx} value={status.value}>
            {status.label}
          </option>
        ))}
      </SelectField>

      <SimpleGrid columns={1} spacing={2} mt="2em">
        <Button
          bgColor="accent.1"
          color="white"
          _hover={{
            bg: "accent.2",
          }}
          variant={"solid"}
          onClick={onSubmit}
        >
          Appliquer
        </Button>
        <Button
          color="accent.1"
          bgColor="white"
          colorScheme="accent"
          onClick={onReset}
        >
          Reset
        </Button>
      </SimpleGrid>
    </SimpleGrid>
  );
}
