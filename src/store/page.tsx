import { create } from "zustand";

type Store = {
  title: string;
};

type Action = {
  updateTitle: (a: string) => void;
};

export const useStore = create<Store & Action>((set) => ({
  title: "Dashboard",
  updateTitle: (title: string) => set({ title: title }),
}));
