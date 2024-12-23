import { NextResponse } from "next/server";
const { prisma } = require("../../../utils/prisma");

export async function GET() {
  try {
    const cohorts = await prisma.cohort.findMany();
    return NextResponse.json(cohorts);
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
