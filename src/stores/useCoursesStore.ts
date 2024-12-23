import axios from "axios";
import { create } from "zustand";

export interface Course {
  id: string;
  course_name: string;
  category: string;
}

interface CoursesStore {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
}

const useCoursesStore = create<CoursesStore>((set) => ({
  courses: [],
  loading: false,
  error: null,
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Course[]>("/api/getAllCourses");

      // Transform the dates from strings to Date objects

      set({
        courses: response.data,
        loading: false,
      });
    } catch (error) {
      let errorMessage = "Failed to fetch courses";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || errorMessage;
      }

      set({
        error: errorMessage,
        loading: false,
      });
      console.error("Error fetching courses:", error);
    }
  },
}));

export default useCoursesStore;
