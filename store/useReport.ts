import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useReport = create(
  persist(
    (set) => ({
      report: null,
      setReport: (report) => set({ report }),
    }),
    {
      name: "venturelens-report", // localStorage key
    }
  )
);
