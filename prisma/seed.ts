const { prisma } = require("../src/utils/prisma");

async function flushData() {
  try {
    // Delete data from all tables, ensuring the correct order to avoid foreign key conflicts
    await prisma.studentCourses.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.cohort.deleteMany({});

    console.log("All data has been deleted (flushed) successfully!");
  } catch (error) {
    console.error("Error while flushing data:", error);
  }
}

async function seedData() {
  try {
    // Create Cohorts
    const cohortA = await prisma.cohort.create({
      data: {
        cohort_name: "AY 2024-25",
      },
    });

    // Create Courses
    const course1 = await prisma.course.create({
      data: {
        course_name: "CBSE 9 Science",
      },
    });

    const course2 = await prisma.course.create({
      data: {
        course_name: "CBSE 9 Math",
      },
    });

    // Create Students
    const students = [];
    for (let i = 1; i <= 50; i++) {
      const student = await prisma.student.create({
        data: {
          name: `Student ${i}`,
          cohort_id: cohortA.id,
          date_joined: new Date("2024-11-17T12:00:00Z"),
          last_login: new Date(
            `2024-11-17T16:${String(i % 60).padStart(2, "0")}:00Z`
          ), // Ensure valid date by zero-padding
          active: i % 3 !== 0, // Randomize active status
        },
      });
      students.push(student);
    }

    // Assign Students to Courses (Many-to-Many Relationship)
    const studentCoursesData = students.flatMap((student, index) => [
      {
        student_id: student.id,
        course_id: course1.id,
      },
      ...(index % 2 === 0
        ? [
            {
              student_id: student.id,
              course_id: course2.id,
            },
          ]
        : []),
    ]);

    await prisma.studentCourses.createMany({
      data: studentCoursesData,
    });

    console.log("Seeding 500 students with cohorts and courses completed");
  } catch (error) {
    console.error("Error while seeding data:", error);
  }
}

async function main() {
  try {
    const action = process.argv[2];

    if (action === "flush") {
      await flushData();
    } else if (action === "seed") {
      await flushData(); // Flush before seeding new data
      await seedData();
    } else {
      console.log("Please specify 'flush' or 'seed' as an argument.");
    }
  } catch (error) {
    console.error("Error during main execution:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
