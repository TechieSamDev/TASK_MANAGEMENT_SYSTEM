# Task Management API

## Introduction

This project provides a simple task management system with user authentication, CRUD operations for tasks, real-time notifications using Socket.IO, and data persistence with MongoDB.

## API Documentation

For detailed documentation on the API endpoints, please visit: [API Documentation](https://documenter.getpostman.com/view/28124373/2sA3QmDEZa)

## Static Page for Data Streaming

The project includes a static page for data streaming, accessible at the root route (/).

- In development, access the static page at: [https://localhost:5000](https://localhost:5000)
- In production, access the static page at: [https://task-management-system-niyo.onrender.com/](https://task-management-system-niyo.onrender.com/)

## Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TechieSamDev/TASK_MANAGEMENT_SYSTEM.git
   cd task-management-system

2. Install Dependencies:
   ```bash
   npm install

3. Setting Environment Variables:
   - If you have access to the `env.txt` file, copy its contents to a new file named `.env`. Otherwise, create a new `.env` file and add the following variables, providing your own values:
     ```dotenv
     # Example .env file
     NODE_ENV=development
     MONGO_URI_DEV=mongodb://127.0.0.1:27017/task-managemtent-system
     MONGO_URI_PROD=mongodb+srv://username:password@clustername.mongodb.net/task-managemtent-system
     JWT_SECRET_KEY=mysecretkey
     JWT_EXPIRES_IN=1d
     ```
   - Please ensure to replace placeholders like `username`, `password`, and `clustername` in the MongoDB URI with your actual credentials.
   - `JWT_SECRET_KEY` should be replaced with your own secure key.
   - `JWT_EXPIRES_IN` specifies the expiration time for JWT tokens. You can adjust this value as needed.
   - Contact the project owner for the `env.txt` file if you don't have access to the `env.txt` file.


4. Run the project:
   - For development environment:
     ```bash
     npm run dev
     ```
   - For production environment:
     ```bash
     npm run prod
     ```
