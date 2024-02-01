import { create } from "zustand";
import { ICat } from "../lib/interfaces";

type IFavCats = {
  isFav: boolean;
  cats: ICat[];
  setFavCats: (f: { isFav: boolean; cats: ICat[] }) => void;
};

type favCatsStore = {
  isFav: boolean;
  cats: ICat[];
  setFavCats: IFavCats["setFavCats"];
};

const favCatsStore = (set: any) => ({
  isFav: false,
  cats: [],
  setFavCats: (f: { isFav: boolean; cats: ICat[] }) =>
    set(() => ({ isFav: f.isFav, cats: f.cats })),
});

const useFavCatsStore = create<favCatsStore>(favCatsStore);
export default useFavCatsStore;
