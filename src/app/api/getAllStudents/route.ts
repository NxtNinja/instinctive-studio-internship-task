// pages/api/students.js
import { NextResponse } from "next/server";
import { Student, StudentCourse, TransformedStudent } from "@/utils/types";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const students: Student[] = await prisma.student.findMany({
      include: {
        cohort: true,
        studentCourses: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        date_joined: "desc", // Assuming there's a `createdAt` timestamp field
      },
    });

    const transformedStudents: TransformedStudent[] = students.map(
      (student) => ({
        ...student,
        courses: student.studentCourses.map((sc: StudentCourse) => sc.course),
        studentCourses: undefined,
      })
    );

    return NextResponse.json(transformedStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
