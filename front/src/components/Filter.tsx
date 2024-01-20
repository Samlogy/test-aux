import { Button, Input, Select, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { generateQuery } from "../lib/functions";

type IFilters = {
  name: string;
  status: string;
  town: string;
  isFavourite: boolean;
};

interface IFilter {
  setCatsList: any;
}

export default function Filter({ setCatsList }: IFilter) {
  const [filters, setFilters] = useState<IFilters>({
    name: "",
    status: "",
    town: "",
    isFavourite: false,
  });

  // load all lists once (catergories - condition -) save them inside localstorage
  const onFilter = () => {
    console.log("filters: ", filters);
    console.log("log: ", generateQuery(filters));
  };

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
      label: "en_cours_adoption",
      value: "En cours d'adoption",
    },
  ];

  const onFavouriteToggle = () => {
    // si favourite => unfavourite + actualise le filtre
    // sinon l'inverse + actualise le filtre
    setFilters({ ...filters, isFavourite: !filters.isFavourite });
  };

  return (
    <SimpleGrid columns={1} spacing={10}>
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
      >
        {TOWNS.map((town: any) => (
          <option key={town.value} value={town.label}>
            {town.value}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Statut"
        name="status"
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        {STATUS.map((status: any) => (
          <option key={status.value} value={status.label}>
            {status.value}
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

      <Button colorScheme="blue" variant={"solid"} onClick={onFilter}>
        Appliquer
      </Button>
    </SimpleGrid>
  );
}
