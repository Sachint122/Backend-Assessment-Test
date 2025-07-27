# ✅ MERN Task Manager (MySQL Version)

A full-featured **Task Management System** built with **React.js (frontend)**, **Node.js + Express (backend)**, and **MySQL (SQL storage)**.  
It includes user authentication, role-based dashboards, full task CRUD, statistics, and session-protected routing.

---

## 🌟 Features

### 🔐 Authentication
- Secure register/login using JWT
- Role-based access: `user` and `manager`
- **Session Storage** used to store tokens securely
- Protected Routes with unauthorized redirect

### 👨‍💼 Admin Panel (Manager Only)
- View all registered users
- View all tasks per user
- Edit/Delete any user task
- Global dashboard stats

### 📋 Task Management
- Users can:
  - Create new tasks
  - Edit or delete their tasks
  - View their own dashboard stats
- **Filtering by status** (`pending`, `in-progress`, `completed`)
- **Sorting by created date**
- **Search by title/description**
- Pagination support

### 📊 Dashboard
- 👤 `User`: Dashboard shows their task summary
- 👨‍💼 `Manager`: Dashboard shows global task stats (total, pending, etc.)
- Fully protected and role-aware

---

## 🚀 Tech Stack

### 🖥️ Frontend
- React.js
- React Router DOM
- Axios (with interceptors)
- CSS Modules & Custom Styling

### 🧠 Backend
- Node.js
- Express.js
- MySQL (`mysql2`)
- JWT (Authentication)
- bcryptjs (Password hashing)
- dotenv

---

## 📁 Folder Structure

```bash
task-manager/
├── client/             # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/ # TaskCard, Navbar, etc.
│   │   ├── pages/      # Login, Register, Dashboard, AdminPanel
│   │   ├── api/        # Axios config
│   │   └── App.js
│   └── package.json
│
├── server/             # Node backend
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── db.js           # MySQL connection
│   ├── server.js       # Entry point
│   ├── .env            # Environment variables
│   └── package.json
│
├── .gitignore
├── README.md
```

---


### ⚙️ Prerequisites

- Node.js installed
- MySQL installed and running
- Git

---

## 🔧 Backend Setup

```bash
cd server
npm install

```
---
## Create .env in server/

```bash 
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_manager
JWT_SECRET=your_jwt_secret
PORT=5000
```
## Start Backend Server
```bash
node server.js
```

Automatically creates DB & tables if not exists.

---

##  Frontend Setup
```bash
cd client
npm install
npm start
```
---

React app will start at http://localhost:3000

## 📬 Postman API Collection

| POST   | /api/auth/register                | Register new user               |
| POST   | /api/auth/login                   | Login and receive JWT           |
| GET    | /api/tasks                        | Get tasks (filter/sort/search)  |
| POST   | /api/tasks                        | Create task                     |
| PUT    | /api/tasks/\:id                   | Update task                     |
| DELETE | /api/tasks/\:id                   | Delete task                     |
| GET    | /api/dashboard/user               | Get user stats                  |
| GET    | /api/dashboard/manager            | Get global stats (Manager only) |
| GET    | /api/tasks/admin/users            | List all users (Manager only)   |
| GET    | /api/tasks/admin/users/\:id/tasks | List tasks by user              |

---

## 📷 Screenshots

Coming soon...
Let me know if you want full visual examples of:
- User dashboard
- Manager panel
- Task cards and filters
- Login/Register UI

---
## 📦 Future Improvements
- ✅ Session-based expiration
- ⏳ Role management (promote/demote users)
- ⏳ Email notifications
- ⏳ Mobile-responsive layout

---

 ## 👨‍💻 Developer
 Sachin Tiwari
📫 Email: sachintiwari.751858@gmail.com
🔗 GitHub: Sachint122


Let me know if you also want:
- Screenshot examples  
- Hosted live demo instructions  
- Contribution guidelines (for GitHub)

I can generate those too ✅
