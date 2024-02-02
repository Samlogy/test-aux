import { create } from "zustand";
import { devtools } from "zustand/middleware";
import storage from "../lib/storage";

interface IUser {
  id: number | string;
  email: string;
  password: string;
}

type AuthStore = { isLogged: boolean; user: IUser; token: string };

type UseAuthSore = {
  isLogged: boolean;
  user: IUser;
  token: string;
  setLogin: (d: AuthStore) => void;
  setLogout: () => void;
};

const INIT_USER = {
  id: "",
  email: "",
  password: "",
};

const loginState = (payload: AuthStore) => ({
  isLogged: true,
  user: payload.user,
  token: payload.token,
});

const logoutState = () => ({ isLogged: false, user: INIT_USER, token: "" });

let authStore = (set: any) => ({
  isLogged: false,
  token: "",
  user: INIT_USER,
  setLogin: (payload: AuthStore) => {
    set(() => loginState(payload));
    storage.setStorage("auth--chadopt", payload);
  },
  setLogout: () => {
    set(() => logoutState());
    storage.setStorage("auth--chadopt", {
      user: INIT_USER,
      token: "",
    });
  },
});

authStore = devtools(authStore);
const useAuthStore = create<UseAuthSore>(authStore);

// Check local storage on initialization
const storedAuth = localStorage.getItem("auth--chadopt");
if (storedAuth) {
  const parsedAuth = JSON.parse(storedAuth);
  useAuthStore.setState(() => parsedAuth);
}

export default useAuthStore;
