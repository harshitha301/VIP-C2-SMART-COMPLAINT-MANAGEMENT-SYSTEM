# Smart Complaint Management System

A full-stack MERN application designed to streamline the process of submitting, tracking, and resolving citizen complaints through a centralized digital platform.

## Overview

The Smart Complaint Management System enables citizens to register complaints online and monitor their resolution status in real time. Administrators can efficiently manage complaints, update statuses, analyze trends, and improve service delivery through an intuitive dashboard.

## Key Features

### Citizen User

* User registration and secure login
* Submit complaints with category and priority selection
* Track complaint status in real time
* View complaint history
* Submit feedback after complaint resolution

### Administrator

* Secure admin authentication
* View and manage all complaints
* Filter complaints by category, priority, and status
* Update complaint statuses
* Access complaint analytics and reports
* Monitor overall system performance

## Technology Stack

### Frontend

* React.js
* Bootstrap 5
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JSON Web Token (JWT)

## System Architecture

```text
Citizen User
      │
      ▼
React Frontend
      │
      ▼
Node.js + Express API
      │
      ▼
MongoDB Database
      │
      ▼
Admin Dashboard
```

## Project Structure

```text
complaint-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/harshitha301/VIP-C2-SMART-COMPLAINT-MANAGEMENT-SYSTEM.git
cd VIP-C2-SMART-COMPLAINT-MANAGEMENT-SYSTEM
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend application will run at:

```text
http://localhost:3000
```

The backend server will run at:

```text
http://localhost:5000
```

## Environment Variables

Create a `.env` file inside the `backend` directory and configure the required environment variables.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

> Note: The actual `.env` file is excluded from this repository for security purposes.

## Demo Credentials

### Administrator Account

```text
Email: admin@gmail.com
Password: Admin@123
```

### Citizen User Account

Users can create an account through the registration page.

## Application Workflow

1. User registers or logs in.
2. User submits a complaint.
3. Complaint data is stored in the database.
4. Administrator reviews the complaint.
5. Administrator updates the complaint status.
6. User tracks complaint progress.
7. User submits feedback after resolution.

## Future Enhancements

* Email and SMS notifications
* Complaint assignment to agents
* File and image attachments
* Geo-location support
* Mobile application integration
* Advanced analytics dashboard

## Author

**Yarkala Harshitha**

Internship Project – VIP C2

