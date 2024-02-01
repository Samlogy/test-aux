import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type IFilters = {
  filters: {
    name: string;
    status: string;
    town: string;
  };
  setFilters: (f: any) => void;
};

let filterStore = (set) => ({
  filters: {
    name: "",
    status: "",
    town: "",
  },
  setFilters: (f: any) => set(() => ({ filters: { ...f } })),
});

// filterStore = persist(filterStore);
filterStore = devtools(filterStore);
const useFilterStore = create<IFilters>(filterStore);
export default useFilterStore;
