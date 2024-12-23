import { NextResponse } from "next/server";
const { prisma } = require("../../../utils/prisma");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, cohort_id, courses } = body;

    if (!name || !cohort_id || !Array.isArray(courses)) {
      return NextResponse.json(
        {
          error:
            "Invalid input. Ensure name, email, cohort_name, and courses are provided.",
        },
        { status: 400 }
      );
    }

    // Create the student
    const student = await prisma.student.create({
      data: {
        name,
        cohort_id: cohort_id,
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

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
