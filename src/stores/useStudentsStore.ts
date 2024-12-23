// stores/useStudentsStore.ts
import { create } from "zustand";
import axios from "axios";
import { TransformedStudent } from "@/utils/types";

export interface Cohort {
  id: string;
  cohort_name: string;
}

export interface Course {
  id: string;
  course_name: string;
  category: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  date_joined: Date;
  cohort_id: string;
  last_login: Date | null;
  active: boolean;
  cohort: Cohort;
  courses: Course[];
}

interface StudentsStore {
  students: Student[];
  loading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
}

const useStudentsStore = create<StudentsStore>((set) => ({
  students: [],
  loading: false,
  error: null,
  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<TransformedStudent[]>(
        "/api/getAllStudents"
      );

      // Transform the dates from strings to Date objects
      const transformedStudents = response.data.map((student) => ({
        ...student,
        date_joined: new Date(student.date_joined),
        last_login: student.last_login ? new Date(student.last_login) : null,
      }));

      set({
        students: transformedStudents,
        loading: false,
      });
    } catch (error) {
      let errorMessage = "Failed to fetch students";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || errorMessage;
      }

      set({
        error: errorMessage,
        loading: false,
      });
      console.error("Error fetching students:", error);
    }
  },
}));

export default useStudentsStore;
