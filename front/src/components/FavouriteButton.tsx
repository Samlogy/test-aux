import { IconButton } from "@chakra-ui/react";
import { MouseEvent, useEffect, useState } from "react";
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
  const loadCats = () => storage.getStorage("favourite--chadopt") || [];
  const [isFav, setIsFav] = useState(false);

  const isFavState = useFavCatsStore((state) => state.isFav);
  const setFavCats = useFavCatsStore((state) => state.setFavCats);

  const user = useAuthStore((state) => state.user);  

  const isFavourite = (cat: ICat) => {
    return loadCats().some((c) => c.id === cat.id);
  };

  const setIsFavourite = async (cat: ICat) => {
    const cats = loadCats();

    let newCats: ICat[];

    if (isFavourite(cat)) {
      newCats = cats.filter((el: ICat) => el.id !== cat.id);
    } else {
      newCats = [...cats, cat];
    }
    setFavCats({ isFav: isFavState, cats: newCats });

    storage.setStorage("favourite--chadopt", newCats);

    console.log(`cat/fav/${cat.id}/user/${user.id}`);

    await fetechRequest("POST", `cat/fav/${cat.id}/user/${user.id}`);
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
