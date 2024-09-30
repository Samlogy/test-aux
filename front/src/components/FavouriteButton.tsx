import { IconButton } from "@chakra-ui/react";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import fetechRequest from "../lib/api";
import { ICat } from "../lib/interfaces";
import storage from "../lib/storage";
import useAuthStore from "../store/useAuthStore";
import useFavCatsStore from "../store/useFavCatsStore";

interface IFavouriteButton {
  cat: ICat;
}

export default function FavouriteButton({ cat }: IFavouriteButton) {
  const [isFav, setIsFav] = useState(false);

  const isFavState = useFavCatsStore((state) => state.isFav);
  const setFavCats = useFavCatsStore((state) => state.setFavCats);
  const user = useAuthStore((state) => state.user);  

  const loadCats = useCallback(() => storage.getStorage("favourite--chadopt"), [])

  const isFavourite = (id: string | number | undefined) => {
    return loadCats().some((c:ICat) => c.id === id);
  };

  const setIsFavourite = async (cat: ICat) => {
    const cats = loadCats();
    let newCats: ICat[];

    if (isFavourite(cat.id)) {
      newCats = cats.filter((c: ICat) => c.id !== cat.id);
    } else {
      newCats = [...cats, cat];
    }
    setFavCats({ isFav: isFavState, cats: newCats });
    storage.setStorage("favourite--chadopt", newCats);
    await fetechRequest("POST", `cat/favorite/${cat.id}/user/${user.id}`);
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
      icon={
        isFav ? (
          <AiFillHeart size="20" color="#7B341E" />
        ) : (
          <AiOutlineHeart size="20" color="#7B341E" />
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
