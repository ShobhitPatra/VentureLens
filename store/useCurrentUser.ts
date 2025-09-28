import { create } from "zustand";

interface currentUserI {
  name?: string;
  email: string;
  image?: string;
}
interface currentUserProps {
  currentUser: currentUserI | null;
  setCurrentUser: (currentUser: currentUserI) => void;
}

export const useCurrentUser = create<currentUserProps>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));
