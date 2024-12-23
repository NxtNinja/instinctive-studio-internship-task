"use client";

import { FC, useEffect } from "react";
import useStudentsStore from "../stores/useStudentsStore";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { students, loading, error, fetchStudents } = useStudentsStore();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <h3>{student.name}</h3>
            <p>Email: {student.email}</p>
            <p>Cohort: {student.cohort?.cohort_name}</p>
            <p>Courses:</p>
            <ul>
              {student.courses.map((course) => (
                <li key={course.id}>{course.course_name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
