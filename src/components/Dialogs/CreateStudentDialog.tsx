import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCohortsStore from "@/stores/useCohortsStore";
import useCoursesStore from "@/stores/useCoursesStore";
import useStudentsStore from "@/stores/useStudentsStore";
import axios from "axios";
import { Loader, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const CreateStudentDialog = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedCohort, setSelectedCohort] = useState<string>("");
  const [studentName, setStudentName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { courses, fetchCourses } = useCoursesStore();
  const { fetchStudents } = useStudentsStore();
  const {
    cohorts,

    fetchCohorts,
  } = useCohortsStore();

  useEffect(() => {
    fetchCourses();
    fetchCohorts();
  }, [fetchCohorts, fetchCourses]);

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

  const createStudent = async () => {
    if (studentName && selectedCohort && selectedCourses.length >= 0) {
      // API call to create student
      setLoading(true);

      try {
        const res = await axios.post("/api/createStudent", {
          name: studentName,
          cohort_id: selectedCohort,
          courses: selectedCourses,
        });
        if (res.status === 201) {
          setLoading(false);
          setIsDialogOpen(false);
          fetchStudents();
          toast.success("Student created successfully");
          setStudentName("");
          setSelectedCohort("");
          setSelectedCourses([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-3 bg-[#E9EDF1] hover:bg-[#E9EDF1] text-[#3F526E] font-bold text-lg px-8">
          <Plus size={50} />
          <p className="">Add new student</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>New student profile</DialogTitle>
          <DialogDescription>
            Create a new student profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Student Name
            </label>
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
        </div>
        <DialogFooter>
          <Button
            onClick={createStudent}
            className="bg-[#E9EDF1] hover:bg-[#E9EDF1] text-[#3F526E] font-bold w-full text-lg border-gray-400 border"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudentDialog;
