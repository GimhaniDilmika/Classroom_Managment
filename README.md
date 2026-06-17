# ClassEase — Smart Classroom Intelligence System

ClassEase is a professional classroom management and intelligence dashboard built with React, Vite, and Firebase. It goes beyond basic CRUD features by combining student management, attendance intelligence, role-based learning portals, assessment workflows, live session tracking, finance records, timetable planning, and classroom insights in one modern interface.

## Dashboard Preview

<p align="center">
  <img src="dashbord.png" width="900" alt="ClassEase Dashboard Preview"/>
</p>

## Role-Based Access

ClassEase supports three real-world user roles:

- **Admin** — manages students, teachers, classes, subjects, attendance, timetable, live sessions, fees, expenses, and system settings.
- **Teacher** — manages assigned classes, students, attendance, assignments, papers, term-test marks, live sessions, and student support notes.
- **Student** — views personal timetable, assignments, papers, marks, attendance, live sessions, fee status, and profile information.

## Key Modules

- Firebase Authentication and Firestore user roles
- Role-based dashboard redirection
- Professional grouped sidebar navigation
- Admin dashboard with classroom intelligence insights
- Student add, list, and profile management
- Teacher workspace with assignments and term-test marks
- Student learning portal with view-only academic data
- Attendance management with status tracking and CSV export
- Live session scheduling and meeting link management
- Fees collection dashboard with payment status tracking
- Expense management with budget usage monitoring
- Profile, settings, dark mode, and password management

## Teacher Workflow

Teachers can create and manage:

- Assignments
- Practical papers
- Revision papers
- Term-test papers
- Due dates and max marks
- Student marks and grades
- Teacher remarks
- Academic support alerts

## Student Workflow

Students can view:

- My class timetable
- My assignments and papers
- My marks and term-test results
- My attendance percentage
- My live sessions
- My fee status
- My profile and settings

Students cannot edit teacher-managed academic data.

## Tech Stack

- React
- Vite
- Firebase Authentication
- Firestore
- React Router
- React Icons
- LocalStorage for demo module persistence

## How to Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Demo Role Setup

Create users from the Register page or Firebase Authentication.

Example demo accounts:

```text
admin@gmail.com / 123456     → Admin Dashboard
teacher@gmail.com / 123456   → Teacher Dashboard
student@gmail.com / 123456   → Student Dashboard
```

Firebase passwords must be at least 6 characters.

## Notes

Student records are connected with Firebase in the existing project flow. Attendance, live sessions, assignments, marks, fees, and expenses include complete front-end workflows with local persistence, making them ready for later Firestore integration.
