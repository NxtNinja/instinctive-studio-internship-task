"use client";

import CreateStudentDialog from "@/components/Dialogs/CreateStudentDialog";
import StudentsTable from "@/components/StudentsTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCohortsStore from "@/stores/useCohortsStore";
import useCoursesStore from "@/stores/useCoursesStore";
import useStudentsStore from "@/stores/useStudentsStore";
import { useEffect } from "react";

const Page = () => {
  const { courses, fetchCourses } = useCoursesStore();
  const { cohorts, fetchCohorts } = useCohortsStore();
  const { students, loading, fetchStudents } = useStudentsStore();

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchCohorts();
  }, [fetchStudents, fetchCourses, fetchCohorts]); // Added fetchCourses and fetchCohorts to dependencies

  return (
    <div className="bg-white h-[80dvh] p-4 lg:p-5 flex flex-col gap-8 rounded-2xl w-full overflow-y-auto">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        {/* Select Filters */}
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 w-full lg:w-auto">
          <Select>
            <SelectTrigger className="w-full lg:w-[180px] bg-[#E9EDF1] text-[#3F526E] font-medium text-sm lg:font-bold lg:text-lg py-2 lg:py-3">
              <SelectValue placeholder="Select Cohort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cohorts</SelectLabel>
                {cohorts.map((cohort) => (
                  <SelectItem key={cohort.id} value={cohort.id}>
                    {cohort.cohort_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full lg:w-[180px] bg-[#E9EDF1] text-[#3F526E] font-medium text-sm lg:font-bold lg:text-lg py-2 lg:py-3">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Courses</SelectLabel>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.course_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Add Student Button */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
          <CreateStudentDialog />
        </div>
      </div>

      {/* Students Table */}
      <StudentsTable students={students} loading={loading} />
    </div>
  );
};

export default Page;
