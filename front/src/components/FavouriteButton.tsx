import { IconButton } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";

interface IFavouriteButton {
  cat: ICat;
}

export default function FavouriteButton({ cat }: IFavouriteButton) {
  const loadCats = () => storage.getStorage("favourite-cats--chadopt");

  const setIsFavourite = (cat: ICat) => {
    const cats = loadCats();

    const newCats = isFavourite(cat)
      ? cats.filter((el: ICat) => el.id !== cat.id)
      : [...cats, cat];

    storage.setStorage("favourite-cats--chadopt", newCats);
  };

  const isFavourite = (cat: ICat) => {
    const cats = loadCats();
    return cats.some((c) => c.id === cat.id);
  };

  const handleFavourite = (e) => {
    setIsFavourite(cat);
    e.stopPropagation();
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
      icon={
        isFavourite(cat) ? (
          <AiFillHeart size="18" />
        ) : (
          <AiOutlineHeart size="18" />
        )
      }
      boxShadow="md"
      onClick={handleFavourite}
      pos="absolute"
      bottom="20"
      right="4"
    />
  );
}
