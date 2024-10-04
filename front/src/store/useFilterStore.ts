import { create } from "zustand";

export type filtersType = {
  name: string;
  status: string;
  town: string;
  race: string;
  gender: string;
  age: number | string;
}
export type IFilters = {
  filters: filtersType;
  setFilters: (f: filtersType) => void;
};

export const INIT_FILTERS = {
  name: "",
  status: "",
  town: "",
  race: "",
  gender: "",
  age: "",
}

const filterStore = (set) => ({
  filters: INIT_FILTERS,
  setFilters: (f: filtersType) => set(() => ({ filters: { ...f } })),
});

// filterStore = persist(filterStore);
// filterStore = devtools(filterStore);
const useFilterStore = create<IFilters>(filterStore);
export default useFilterStore;
