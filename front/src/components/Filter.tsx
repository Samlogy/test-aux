import { Button, SimpleGrid } from "@chakra-ui/react";
import { useMemo } from "react";
import fetechRequest from "../lib/api";
import { generateQuery } from "../lib/functions";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";
import { IFilters, INIT_FILTERS } from "../store/useFilterStore";
import { InputField, SelectField } from "./";

interface IFilterProps {
  setCatsList: React.Dispatch<React.SetStateAction<ICat[]>>;
  filters: IFilters["filters"];
  setFilters: React.Dispatch<React.SetStateAction<IFilters["filters"]>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
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

    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: name === "name" ? value.toLowerCase() : value,
    });
  };

  const onReset = async () => {
    setFilters(INIT_FILTERS);
    const res = await fetechRequest("GET", `cat`);
    setCatsList(res.data);
    setPagination(res.pagination);
  };

  const onSubmit = async () => {
    const query = generateQuery(filters);
    const res = await fetechRequest("GET", `cat?${query}`);
    setCatsList(res.data);
    setPagination(res.pagination);
  };

  return (
    <SimpleGrid columns={1} spacing={4}>
      <InputField
        type="text"
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
        {CONSTANTS?.towns.map((town) => (
          <option key={town.value} value={town.value}>
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
        {CONSTANTS?.status.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </SelectField>

      <SelectField
        placeholder="Race"
        name="race"
        onChange={onFilter}
        value={filters.race}
      >
        {CONSTANTS?.races.map((race) => (
          <option key={race.value} value={race.value}>
            {race.label}
          </option>
        ))}
      </SelectField>

      <SelectField
        placeholder="Genre"
        name="gender"
        onChange={onFilter}
        value={filters.gender}
      >
        {CONSTANTS?.genders.map((gender) => (
          <option key={gender.value} value={gender.value}>
            {gender.label}
          </option>
        ))}
      </SelectField>

      <InputField
        type="number"
        name="age"
        onChange={onFilter}
        value={filters.age}
        placeholder="Age"
      />

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
          onClick={onReset}
        >
          Reset
        </Button>
      </SimpleGrid>
    </SimpleGrid>
  );
}
