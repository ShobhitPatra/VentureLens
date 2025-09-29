import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCurrentUser = create(
  persist(
    (set) => ({
      currentUer: null,
      setCurrentUser: (currentUser) => set({ currentUser }),
    }),
    {
      name: "venturelens-user", // localStorage key
    }
  )
);
