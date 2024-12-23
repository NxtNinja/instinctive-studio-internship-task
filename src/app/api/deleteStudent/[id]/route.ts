import { NextResponse } from "next/server";
const { prisma } = require("../../../../utils/prisma");

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: studentId } = await params;

    console.log(studentId);

    await prisma.studentCourses.deleteMany({
      where: {
        student_id: studentId,
      },
    });

    await prisma.student.deleteMany({
      where: {
        id: studentId,
      },
    });

    return NextResponse.json({ status: 204 });
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
