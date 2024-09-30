import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type IFilters = {
  filters: {
    name: string;
    status: string;
    town: string;
    race: string;
    gender: string;
    age: number;
  };
  setFilters: (f: any) => void;
};

export const INIT_FILTERS = {
  name: "",
  status: "",
  town: "",
  race: "",
  gender: "",
  age: "",
}

let filterStore = (set) => ({
  filters: INIT_FILTERS,
  setFilters: (f: any) => set(() => ({ filters: { ...f } })),
});

// filterStore = persist(filterStore);
filterStore = devtools(filterStore);
const useFilterStore = create<IFilters>(filterStore);
export default useFilterStore;
