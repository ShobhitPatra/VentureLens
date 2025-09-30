import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  name?: string;
  image?: string;
}

interface CurrentUserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useCurrentUser = create<CurrentUserStore>()(
  persist(
    (set) => ({
      currentUser: null, // Fixed typo: was "currentUer"
      setCurrentUser: (currentUser) => set({ currentUser }),
    }),
    {
      name: "venturelens-user", // localStorage key
    }
  )
);
