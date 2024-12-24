### **Student Management Admin Panel - Internship Task**

#### **Overview**

This project is an **Admin Panel for Student Management**, designed to demonstrate CRUD (Create, Read, Update, Delete) operations for managing student data. The task involves building a responsive and functional UI with seamless backend integration. The technologies used are modern and widely adopted in the industry, showcasing proficiency in full-stack development.

---

#### **Features**

1. **Student Management:**

   - Add new students (Create).
   - View a list of students (Read).
   - Update student information (Update).
   - Remove students from the database (Delete).

2. **User-Friendly Interface:**

   - A clean, responsive UI built with **Tailwind CSS**.
   - Simple navigation for admins to manage data efficiently.

3. **Database Management:**
   - Backend powered by **Supabase** with a **PostgreSQL** database.
   - Integrated with **Prisma** ORM for database operations.

---

#### **Technologies Used**

- **Frontend:**

  - [Next.js](https://nextjs.org/) - React framework for building scalable web applications.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI design.

- **Backend:**

  - [Supabase](https://supabase.io/) - Open-source Firebase alternative for authentication and database management.
  - [Prisma](https://www.prisma.io/) - Modern database toolkit and ORM for easy integration with PostgreSQL.

- **Database:**
  - [PostgreSQL](https://www.postgresql.org/) - Reliable, high-performance relational database.

---

#### **Usage**

1. **Add Students:**

   - Use the "Add Student" form to input details like name, email, and age.
   - Save the details to the database.

2. **View Students:**

   - A table displays all student records from the database.

3. **Update Student Information:**

   - Edit details of existing students using the "Edit" option.

4. **Delete Students:**
   - Remove students permanently using the "Delete" option.

---

#### **Folder Structure**

```
└── 📁instinctive-studio-internship
    └── 📁prisma
        └── 📁migrations
            └── 📁20241219152614_add_inverse_relations_to_course
                └── migration.sql
            └── 📁20241220140744_schema_change
                └── migration.sql
            └── 📁20241221062020_schema_updated
                └── migration.sql
            └── 📁20241222155704_email_field_removed
                └── migration.sql
            └── 📁20241222170838_updated_schema
                └── migration.sql
            └── 📁20241223121733_category_removed
                └── migration.sql
            └── migration_lock.toml
        └── schema.prisma
        └── seed.ts
    └── 📁public
        └── Avatar.svg
        └── Chapter_icon.svg
        └── Dashboard_icon.svg
        └── file.svg
        └── globe.svg
        └── Help_icon.svg
        └── next.svg
        └── Reports_icon.svg
        └── Settings_icon.svg
        └── Students_icon.svg
        └── Vector.svg
        └── vercel.svg
        └── window.svg
    └── 📁src
        └── 📁app
            └── 📁(dashboard)
                └── 📁dashboard
                    └── layout.tsx
                    └── page.tsx
                    └── 📁students
                        └── page.tsx
            └── 📁api
                └── 📁createStudent
                    └── route.ts
                └── 📁deleteStudent
                    └── route.ts
                └── 📁getAllCohorts
                    └── route.ts
                └── 📁getAllCourses
                    └── route.ts
                └── 📁getAllStudents
                    └── route.ts
                └── 📁updateStudent
                    └── route.ts
            └── favicon.ico
            └── globals.css
            └── layout.tsx
            └── page.tsx
        └── 📁components
            └── 📁Buttons
                └── DeleteStudentButton.tsx
            └── 📁Dialogs
                └── CreateStudentDialog.tsx
                └── UpdateStudentDialog.tsx
            └── Header.tsx
            └── MobileSidebar.tsx
            └── Providers.tsx
            └── StudentsTable.tsx
            └── TableSkeleton.tsx
            └── 📁ui
                └── alert-dialog.tsx
                └── badge.tsx
                └── button.tsx
                └── dialog.tsx
                └── input.tsx
                └── select.tsx
                └── sheet.tsx
                └── skeleton.tsx
                └── sonner.tsx
                └── table.tsx
        └── 📁lib
            └── utils.ts
        └── middleware.ts
        └── 📁stores
            └── useCohortsStore.ts
            └── useCoursesStore.ts
            └── useStudentsStore.ts
            └── useStudentStore.ts
        └── 📁utils
            └── prisma.ts
            └── types.ts
    └── .env
    └── .gitignore
    └── components.json
    └── eslint.config.mjs
    └── next-env.d.ts
    └── next.config.ts
    └── package.json
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.ts
    └── tsconfig.json
```

---

#### **Future Improvements**

- Add user authentication for admin access.
- Implement search and filter functionality for student records.
- Add pagination for large datasets.
- Enhance UI with advanced animations and transitions.

---

#### **Contributing**

Feel free to contribute to this project by forking the repository, creating a new branch, and submitting a pull request. Contributions are welcome!

---

Happy coding! 🚀
