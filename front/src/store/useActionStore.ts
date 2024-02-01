import { create } from "zustand";
import { ICat } from "../lib/interfaces";

interface State {
  edit: boolean;
  add: boolean;
  details: boolean;
  delete: boolean;
}

interface Actions {
  setEdit: (payload: boolean) => void;
  setAdd: (payload: boolean) => void;
  setDetails: (payload: boolean) => void;
  setDelete: (payload: boolean) => void;
}

interface IActionStore {
  state: State;
  cat: ICat;
  setCat: (c: ICat) => void;
  actions: Actions;
}

export const INIT_CAT = {
  id: "",
  name: "",
  sex: "",
  description: "",
  status: "",
  race: "",
  picture: "",
  town: "",
  age: "",
  popularity: 0,
};

const INIT_STATE = {
  edit: false,
  add: false,
  details: false,
  delete: false,
};

const updateState = (state: IActionStore, payload: boolean) => ({
  state: { ...state.state, edit: payload },
});

const detailsState = (state: IActionStore, payload: boolean) => ({
  state: { ...state.state, details: payload },
});

const deleteState = (state: IActionStore, payload: boolean) => ({
  state: { ...state.state, delete: payload },
});

const addState = (state: IActionStore, payload: boolean) => ({
  state: { ...state.state, add: payload },
});

const useActionStore = create<IActionStore>((set) => ({
  state: INIT_STATE,
  cat: INIT_CAT,
  setCat: (payload: ICat) => set((state) => ({ ...state, cat: payload })),
  actions: {
    setEdit: (payload: boolean) => set((state) => updateState(state, payload)),
    setAdd: (payload: boolean) => set((state) => addState(state, payload)),
    setDetails: (payload: boolean) =>
      set((state) => detailsState(state, payload)),
    setDelete: (payload: boolean) =>
      set((state) => deleteState(state, payload)),
  },
}));

export default useActionStore;
