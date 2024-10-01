import { create } from "zustand";
import { ICat } from "../lib/interfaces";

interface State {
  edit: boolean;
  add: boolean;
  details: boolean;
  delete: boolean;
  adoption: {
    list: boolean,
    accept: boolean,
    deny: boolean,
  }
}

interface Actions {
  setEdit: (payload: boolean) => void;
  setAdd: (payload: boolean) => void;
  setDetails: (payload: boolean) => void;
  setDelete: (payload: boolean) => void;

  setAdoptionList: (payload: boolean) => void;
  setAdoptionAccept: (payload: boolean) => void;
  setAdoptionDeny: (payload: boolean) => void;
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
  gender: "",
  description: "",
  status: "",
  race: "",
  picture: "",
  town: "",
  age: "",
  popularity: "",
  isReqAdopt: false,
};

const INIT_STATE = {
  edit: false,
  add: false,
  details: false,
  delete: false,
  adoption: {
    list: false,
    accept: false,
    deny: false,
  }
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

const acceptAdoptionRequest = (state: IActionStore, payload: boolean) => ({
  state: { 
    ...state.state, 
    adoption: {
      ...state.state.adoption,
      accept: payload
    } 
  },
});

const getAdoptionList = (state: IActionStore, payload: boolean) => ({
  state: { 
    ...state.state, 
    adoption: {
      ...state.state.adoption,
      list: payload
    } 
  },
})

const denyAdoptionRequest = (state: IActionStore, payload: boolean) => ({
  state: { 
    ...state.state, 
    adoption: {
      ...state.state.adoption,
      deny: payload
    } 
  },
})

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

    setAdoptionList: (payload: boolean) =>
      set((state) => getAdoptionList(state, payload)),
    setAdoptionAccept: (payload: boolean) =>
      set((state) => acceptAdoptionRequest(state, payload)),
    setAdoptionDeny: (payload: boolean) =>
      set((state) => denyAdoptionRequest(state, payload)),
  },
}));

export default useActionStore;
