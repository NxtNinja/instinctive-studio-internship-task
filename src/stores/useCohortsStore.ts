import axios from "axios";
import { create } from "zustand";

export interface Cohort {
  id: string;
  cohort_name: string;
}

interface CohortsStore {
  cohorts: Cohort[];
  loading: boolean;
  error: string | null;
  fetchCohorts: () => Promise<void>;
}

const useCohortsStore = create<CohortsStore>((set) => ({
  cohorts: [],
  loading: false,
  error: null,
  fetchCohorts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Cohort[]>("/api/getAllCohorts");
      set({
        cohorts: response.data,
        loading: false,
      });
    } catch (error) {
      let errorMessage = "Failed to fetch cohorts";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || errorMessage;
      }
      set({ loading: false, error: errorMessage });
    }
  },
}));

export default useCohortsStore;
