import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReportStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any | null;
  setReport: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    report: any | null
  ) => void;
}

export const useReport = create<ReportStore>()(
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
