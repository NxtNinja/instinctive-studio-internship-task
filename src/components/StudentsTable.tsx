import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransformedStudent } from "@/utils/types";
import { FC, useState } from "react";
import UpdateStudentDialog from "./Dialogs/UpdateStudentDialog";
import TableSkeleton from "./TableSkeleton";
import { Badge } from "./ui/badge";

interface StudentsTableProps {
  students: TransformedStudent[];
  loading: boolean;
}

const StudentsTable: FC<StudentsTableProps> = ({ students, loading }) => {
  const [selectedStudent, setSelectedStudent] =
    useState<TransformedStudent | null>(null);

  const formatDate = (date: Date | string, showTime: boolean = true) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: showTime ? "numeric" : undefined,
      minute: showTime ? "numeric" : undefined,
      hour12: true,
    };

    return new Date(date).toLocaleString("en-IN", options);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-black text-sm lg:text-base">
            Student Name
          </TableHead>
          <TableHead className="font-bold text-black text-sm lg:text-base">
            Cohort
          </TableHead>
          <TableHead className="font-bold text-black text-sm lg:text-base">
            Courses
          </TableHead>
          <TableHead className="font-bold text-black text-sm lg:text-base">
            Date Joined
          </TableHead>
          <TableHead className="font-bold text-black text-sm lg:text-base">
            Last Login
          </TableHead>
          <TableHead className="font-bold text-black text-sm lg:text-base">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <TableSkeleton />
      ) : (
        <TableBody>
          {students ? (
            students.map((student) => (
              <Dialog
                key={student.id}
                open={selectedStudent?.id === student.id}
                onOpenChange={(open) =>
                  setSelectedStudent(open ? student : null)
                }
              >
                <DialogTrigger asChild>
                  <TableRow className="cursor-pointer hover:bg-gray-100">
                    <TableCell className="text-xs lg:text-sm truncate">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm truncate">
                      {student.cohort.cohort_name}
                    </TableCell>
                    <TableCell className="lg:space-x-2 space-y-2 lg:space-y-0">
                      {student.courses.map((course) => (
                        <Badge
                          key={course.id}
                          className="bg-[#F6F8FA] rounded-md py-1 text-black px-4 text-xs lg:text-sm font-normal hover:bg-[#F6F8FA]"
                        >
                          {course.course_name}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm whitespace-nowrap">
                      {formatDate(student.date_joined, false)}
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm whitespace-nowrap">
                      {student.last_login
                        ? formatDate(student.last_login)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block h-4 w-4 rounded-full ${
                          student.active ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                    </TableCell>
                  </TableRow>
                </DialogTrigger>
                <UpdateStudentDialog
                  student={student}
                  setIsDialogOpen={(open) =>
                    setSelectedStudent(open ? student : null)
                  }
                />
              </Dialog>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <p className="text-lg font-bold text-center">
                  Nothing to Show here
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default StudentsTable;
