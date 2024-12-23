import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany();
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
