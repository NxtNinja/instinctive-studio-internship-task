import { FC, useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { TransformedStudent } from "@/utils/types";
import { Button } from "../ui/button";
import { Loader, X } from "lucide-react";
import useCoursesStore from "@/stores/useCoursesStore";
import useCohortsStore from "@/stores/useCohortsStore";
import axios from "axios";
import useStudentsStore from "@/stores/useStudentsStore";
import DeleteStudentButton from "../Buttons/DeleteStudentButton";

interface UpdateStudentDialogProps {
  student: TransformedStudent;
  setIsDialogOpen: (open: boolean) => void;
}

const UpdateStudentDialog: FC<UpdateStudentDialogProps> = ({
  student,
  setIsDialogOpen,
}) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    student.courses.map((c) => c.id)
  );
  const [selectedCohort, setSelectedCohort] = useState<string>(
    student.cohort.id
  );
  const [studentName, setStudentName] = useState(student.name);
  const [isLoading, setLoading] = useState(false);

  const { courses, fetchCourses } = useCoursesStore();
  const { fetchStudents } = useStudentsStore();
  const { cohorts, fetchCohorts } = useCohortsStore();

  useEffect(() => {
    fetchCourses();
    fetchCohorts();
  }, []);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses((prev) => prev.filter((id) => id !== courseId));
  };

  const updateStudent = async (id: string) => {
    if (studentName && selectedCohort && selectedCourses.length >= 0) {
      setLoading(true);

      try {
        const res = await axios.put(`/api/updateStudent/?id=${id}`, {
          name: studentName,
          cohort_id: selectedCohort,
          courses: selectedCourses,
        });
        if (res.status === 200) {
          setIsDialogOpen(false);
          setLoading(false);
          fetchStudents();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setSelectedCourses(student.courses.map((c) => c.id));
    setSelectedCohort(student.cohort.id);
    setStudentName(student.name);
  }, [student]);

  return (
    <DialogContent className="w-full max-w-lg">
      <DialogHeader>
        <DialogTitle>Update student profile</DialogTitle>
        <DialogDescription>
          Update the student profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div>
          <label className="block text-sm font-medium mb-1">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cohort</label>
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Cohort</option>
            {cohorts.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.cohort_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Courses</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedCourses.map((courseId) => {
              const course = courses.find((c) => c.id === courseId);
              return course ? (
                <div
                  key={course.id}
                  className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                >
                  {course.course_name}
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="ml-2 hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
          <select
            onChange={(e) => handleCourseSelect(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            value=""
          >
            <option value="">Add Course</option>
            {courses
              .filter((course) => !selectedCourses.includes(course.id))
              .map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-4 w-4 rounded-full ${
                student.active ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span>{student.active ? "Active" : "Inactive"}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date Joined</label>
          <p className="text-gray-600">
            {new Date(student.date_joined).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
              weekday: "short",
            })}
          </p>
        </div>
      </div>
      <DialogFooter className="flex items-center flex-row gap-2">
        <Button
          onClick={() => updateStudent(student.id)}
          className="bg-[#E9EDF1] hover:bg-[#E9EDF1] text-[#3F526E] font-bold w-full text-lg border-gray-400 border"
        >
          {isLoading ? <Loader className="animate-spin" /> : "Update"}
        </Button>

        <DeleteStudentButton
          id={student.id}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogFooter>
    </DialogContent>
  );
};

export default UpdateStudentDialog;
