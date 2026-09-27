# ClassEase Professional FullStack

ClassEase Professional is a full-stack classroom management system designed to manage students, teachers, subjects, users, and academic activities through role-based access.

The system provides separate functionality for Admin, Teacher, and Student users.

---

## Features

### Admin

- Admin Dashboard
- Student Management
- Add Student
- View Student Profiles
- Edit Student Information
- Delete Students
- Teacher Management
- Add Teachers
- Edit Teacher Information
- Delete Teachers
- Subject Management
- Add Subjects
- Edit Subjects
- Delete Subjects
- User Management
- Role-based Access Control

### Teacher

- Teacher Dashboard
- View Classes
- View Students
- Support Notes
- Assignments
- Marks Management
- Attendance Management
- Timetable
- Live Sessions

### Student

- Student Dashboard
- View Attendance
- View Fees
- View Timetable
- View Assignments
- View Marks
- View Live Sessions
- Student Profile

---

## Screenshots

### Admin Dashboard

![Admin Dashboard](dashbord.png)

### Student Dashboard

![Student Dashboard](student_Dashbord.png)

### Teacher Dashboard

![Teacher Dashboard](teacher_dashborde.png)

---

## Technologies

### Frontend

- React
- Vite
- React Router
- Axios
- React Icons
- CSS

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- bcryptjs
- CORS
- dotenv

### Database

- MongoDB

---

## Authentication

ClassEase uses a custom Express backend for user authentication.

Passwords are securely hashed using `bcryptjs`.

The system supports different user roles:

- Admin
- Teacher
- Student

Role-based access is implemented to control access to different pages and modules.

---

## Project Structure

```text
ClassEase_Professional_FullStack/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   ├── contexts/
│   │   └── Pages/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── dashbord.png
├── student_Dashbord.png
├── teacher_dashborde.png
├── .gitignore
└── README.md
