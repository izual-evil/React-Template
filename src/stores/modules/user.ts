import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { useTabbarStore, useMenuStore } from "@/stores";
import { STORAGE_PREFIX, USER } from "@/config/cache";
import { getUserInfoApi, loginApi, logoutApi } from "@/api/modules/user";

interface IState {
  token: string;
  userInfo: any;
}

interface IActions {
  init: () => void;
  login: (form: any) => Promise<void>;
  getUserInfo: () => Promise<void>;
  logout: () => Promise<void>;
}
const useUserStore = create<IState & IActions>()(
  immer(
    persist(
      (set, get) => ({
        token: "",
        userInfo: {},
        init: () => {
          useMenuStore.getState().init();
          useTabbarStore.getState().init();
          set((state) => {
            state.token = "";
            state.userInfo = {};
          });
        },
        login: async (form) => {
          get().init();
          const { data } = await loginApi(form);
          set((state) => {
            state.token = data.token;
            state.userInfo = data;
            // get().getUserInfo();
          });
        },
        getUserInfo: async () => {
          const { data } = await getUserInfoApi();
          set((state) => {
            state.userInfo = data;
          });
        },
        logout: async () => {
          await logoutApi().then(() => {
            get().init();
          });
        },
      }),
      {
        name: `${STORAGE_PREFIX}${USER}`,
        partialize: (state) => ({
          token: state.token,
          userInfo: state.userInfo,
        }),
      },
    ),
  ),
);

export default useUserStore;
