import { NextResponse } from "next/server";
const { prisma } = require("../../../../utils/prisma");

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: studentId } = await params;
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

    await prisma.studentCourses.deleteMany({
      where: {
        student_id: studentId,
      },
    });

    const updatedStudent = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        name,
        cohort_id,
        studentCourses: {
          create: courses.map((course) => ({
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
