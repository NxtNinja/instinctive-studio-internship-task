import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function DELETE(request: Request) {
  try {
    // Create a URL object from the request URL
    const url = new URL(request.url);
    const studentId = url.searchParams.get("id");

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Delete associated student courses
    await prisma.studentCourses.deleteMany({
      where: {
        student_id: studentId,
      },
    });

    // Delete student
    await prisma.student.delete({
      where: {
        id: studentId,
      },
    });

    return new NextResponse(null, { status: 204 }).headers.set(
      "Cache-Control",
      "no-store"
    );
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
