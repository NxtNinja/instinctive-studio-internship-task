// types/student.ts

// Base types for individual models
type Cohort = {
  id: string;
  cohort_name: string;
};

type Course = {
  id: string;
  course_name: string;
  category: string;
};

type StudentCourse = {
  course: Course;
  course_id: string;
  student_id: string;
};

type Student = {
  id: string;
  name: string;
  email: string;
  date_joined: Date;
  cohort_id: string;
  last_login: Date | null;
  active: boolean;
  cohort: Cohort;
  studentCourses: StudentCourse[];
};

// If you want to use the transformed version from the previous API endpoint
type TransformedStudent = Omit<Student, "studentCourses"> & {
  courses: Course[];
};

export type { Student, Cohort, Course, StudentCourse, TransformedStudent };
