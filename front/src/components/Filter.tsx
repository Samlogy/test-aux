import { Button, Input, Select, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { generateQuery } from "../lib/functions";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";

const TOWNS = [
  {
    label: "Paris",
    value: "paris",
  },
];

const STATUS = [
  {
    label: "Adoptable",
    value: "adoptable",
  },
  {
    label: "Adopté",
    value: "adopté",
  },
  {
    value: "en_cours_adoption",
    label: "En cours d'adoption",
  },
];
type IFilters = {
  name: string;
  status: string;
  town: string;
  isFavourite: boolean;
};
interface IFilterProps {
  setCatsList: React.Dispatch<React.SetStateAction<ICat[]>>;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  filters: IFilters;
}

export default function Filter({
  setCatsList,
  setFilters,
  filters,
}: IFilterProps) {
  const onFilter = async () => {
    const query = generateQuery(filters);
    // const result = await api.getData(`/cat/filter?${query}`);
    // setCatsList(result);
    setFilters(filters);
    storage.setStorage("filters--chadopt", filters);
  };
  const onReset = async () => {
    setFilters({
      name: "",
      status: "",
      town: "",
      isFavourite: false,
    });
    storage.deleteStorage("filters--chadopt");
  };
  const onFavouriteToggle = () => {
    // si favourite => unfavourite + actualise le filtre
    // sinon l'inverse + actualise le filtre
    setFilters({ ...filters, isFavourite: !filters.isFavourite });
  };

  useEffect(() => {
    const storedFilters = storage.getStorage("filters--chadopt") || filters;
    setFilters(storedFilters);
  }, []);

  return (
    <SimpleGrid columns={1} spacing={4}>
      <Input
        type="search"
        name="name"
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        value={filters.name}
        placeholder="Nom"
      />
      <Select
        placeholder="Ville"
        name="town"
        onChange={(e) => setFilters({ ...filters, town: e.target.value })}
        value={filters.town}
      >
        {TOWNS.map((town) => (
          <option key={town.value} value={town.value}>
            {town.label}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Statut"
        name="status"
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        value={filters.status}
      >
        {STATUS.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </Select>

      <Button
        leftIcon={filters.isFavourite ? <AiFillHeart /> : <AiOutlineHeart />}
        colorScheme="blue"
        variant={filters.isFavourite ? "solid" : "outline"}
        onClick={onFavouriteToggle}
      >
        Favoris
      </Button>
      <SimpleGrid columns={1} spacing={2} mt="2em">
        <Button colorScheme="blue" variant={"solid"} onClick={onFilter}>
          Appliquer
        </Button>
        <Button colorScheme="blue" variant={"outline"} onClick={onReset}>
          Reset
        </Button>
      </SimpleGrid>
    </SimpleGrid>
  );
}
