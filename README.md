# ClassEase Professional FullStack

Frontend:
cd frontend
npm install
npm run dev

Backend:
cd backend
npm install
copy .env.example to .env
npm run dev

Backend: Express + MongoDB
Frontend: React + Vite

Database: MongoDB
Authentication: Express + bcryptjs

Features:
- Admin Dashboard
- Student Management
- Teacher Management
- Subject Management
- Student Profiles
- Add, Edit and Delete Students
- Add, Edit and Delete Teachers
- Add, Edit and Delete Subjects
- Role-based Access
- Student Portal
- Teacher Portal
- Admin Portal
- User Authentication

Project Structure:

ClassEase_Professional_FullStack/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── config/
│   ├── package.json
│   └── .env.example
│
└── README.md

API:

Authentication:
 /api/auth

Admin:
 /api/admin

Main Modules:
- Students
- Teachers
- Subjects
- Users
- Dashboard

Backend runs on:
http://localhost:5000

Frontend runs using Vite.

Note:
Create a .env file inside the backend folder using .env.example.
Do not upload the .env file to GitHub.