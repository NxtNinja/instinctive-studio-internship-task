import { NextResponse } from "next/server";
const { prisma } = require("../../../../utils/prisma");

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;

    await prisma.StudentCourses.deleteMany({
      where: {
        student_id: studentId,
      },
    });

    await prisma.student.delete({
      where: {
        id: studentId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
