import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function PUT(req: Request) {
  try {
    // Get the student ID from the query parameters
    const studentId = new URL(req.url).searchParams.get("id");

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, cohort_id, courses } = body;

    if (!name || !cohort_id || !Array.isArray(courses)) {
      return NextResponse.json(
        {
          error:
            "Invalid input. Ensure name, cohort_id, and courses are provided.",
        },
        { status: 400 }
      );
    }

    // Delete existing courses for the student before updating
    await prisma.studentCourses.deleteMany({
      where: {
        student_id: studentId,
      },
    });

    // Update the student with new data
    const updatedStudent = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        name,
        cohort_id,
        studentCourses: {
          create: courses.map((course: string) => ({
            course_id: course,
          })),
        },
      },
      include: {
        cohort: true,
        studentCourses: {
          include: {
            course: true,
          },
        },
      },
    });

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
