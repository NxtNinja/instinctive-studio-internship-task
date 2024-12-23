import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const cohorts = await prisma.cohort.findMany();
    return NextResponse.json(cohorts).headers.set("Cache-Control", "no-store");
  } catch (error) {
    console.error("Error fetching cohorts:", error);
    return NextResponse.json(
      { error: "Failed to fetch cohorts" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
