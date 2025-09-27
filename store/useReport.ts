import { create } from "zustand";

interface ReportStoreProps {
  report: object | null;
  setReport: (report: object) => void;
}

export const useReport = create<ReportStoreProps>((set) => ({
  report: null,
  setReport: (report) => set({ report }),
}));
