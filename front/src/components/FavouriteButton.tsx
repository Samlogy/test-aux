import { IconButton } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ICat } from "../interfaces";

export default function FavouriteButton({ cat }: { cat: ICat }) {
  const loadCats = () => getStorage("favourite-cats--chadopt");

  const setIsFavourite = (cat: ICat) => {
    const cats = loadCats();

    const newCats = isFavourite(cat)
      ? cats.filter((el: ICat) => el.id !== cat.id)
      : [...cats, cat];

    setStorage("favourite-cats--chadopt", newCats);
  };

  const isFavourite = (cat: ICat) => {
    const cats = loadCats();
    return cats.some((c) => c.id === cat.id);
  };

  const handleFavourite = (e: any) => {
    setIsFavourite(cat);
  };

  return (
    <IconButton
      isRound
      bg="white"
      color="gray.900"
      size="sm"
      aria-label="favourite-button"
      _hover={{ transform: "scale(1.1)" }}
      sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
      transition="all 0.15s ease"
      icon={isFavourite(cat) ? <AiFillHeart /> : <AiOutlineHeart />}
      boxShadow="md"
      onClick={handleFavourite}
      pos="absolute"
      top="4"
      right="4"
    />
  );
}

const setStorage = (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  } catch (err) {
    console.error("Error storing data in local storage:", err);
  }
};

const getStorage = (key: any) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) {
      return [];
    }
    return JSON.parse(jsonData);
  } catch (err) {
    console.error("Error loading data from local storage:", err);
    return null;
  }
};
