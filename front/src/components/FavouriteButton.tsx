import { IconButton } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";
import { useEffect, useState, MouseEvent } from "react";

interface IFavouriteButton {
  cat: ICat;
}

export default function FavouriteButton({ cat }: IFavouriteButton) {
  const loadCats = () => storage.getStorage("favourite-cats--chadopt") || [];
  const [isFav, setIsFav] = useState(false);

  const isFavourite = (cat: ICat) => {
    const cats = loadCats();
    return cats.some((c) => c.id === cat.id);
  };

  const setIsFavourite = (cat: ICat) => {
    const cats = loadCats();

    let newCats: ICat[];

    if (isFavourite(cat)) {
      newCats = cats.filter((el: ICat) => el.id !== cat.id);
    } else {
      newCats = [...cats, cat];
    }
    storage.setStorage("favourite-cats--chadopt", newCats);
  };

  const handleFavourite = (e: MouseEvent) => {
    setIsFav(!isFav);
    setIsFavourite(cat);

    e.stopPropagation();
  };

  useEffect(() => {
    setIsFav(loadCats().some((c) => c.id === cat.id));
  }, []);

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
      icon={isFav ? <AiFillHeart size="20" /> : <AiOutlineHeart size="20" />}
      boxShadow="md"
      onClick={handleFavourite}
      pos="absolute"
      bottom="20"
      right="4"
    />
  );
}
