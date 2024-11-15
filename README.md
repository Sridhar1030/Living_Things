# Energy Analytics Web Application 🔋

A comprehensive web application for managing and visualizing energy data and access logs with secure authentication. Built with React, Node.js, and MongoDB and state management using Redux Thunk.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-ready-success.svg)

## ✨ Features

-   **🔐 Secure Authentication**

    -   JWT-based access and refresh tokens
    -   Secure registration and login
    -   Local storage session management

-   **📊 Data Management**

    -   Interactive energy data dashboard
    -   Comprehensive access log management
    -   Intuitive log entry forms

-   **🎯 User Experience**
    -   Dynamic navigation with active link highlighting
    -   Seamless logout with automatic redirect
    -   Responsive design for all devices

## 🛠️ Technologies

### Frontend

-   React
-   Tailwind CSS
-   React Router
-   Redux + Redux Thunk

### Backend

-   Node.js
-   Express
-   MongoDB with Mongoose
-   JWT & bcrypt

### Utilities

-   Axios for HTTP requests
-   JWT for authentication

## 📁 Project Structure

```
├── backend/
│   ├── controllers/         # Request handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── utils/              # Helper functions
│   └── server.js           # Express setup
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── redux/         # State management
│   │   └── App.js         # Root component
│   └── public/            # Static files
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (local or Atlas)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Energy-Analytics
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables

```bash
# Create .env in backend directory
cp .env.example .env
```

4. Start the application

```bash
# Start backend server
cd backend
npm start

# Start frontend (in a new terminal)
cd frontend
npm start
```

## ⚙️ Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=<Your MongoDB URI>

# JWT Configuration
ACCESS_TOKEN_SECRET=<Your Access Token Secret>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=<Your Refresh Token Secret>
REFRESH_TOKEN_EXPIRY=7d
```

## 🔌 API Reference

### Authentication

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Create new user account |
| POST   | `/api/auth/login`    | Authenticate user       |
| POST   | `/api/auth/logout`   | End user session        |

### Data Management

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| GET    | `/api/logs` | Fetch access logs    |
| POST   | `/api/logs` | Create new log entry |

## 👤 User Schema

```javascript
{
  username: String,  // Unique login identifier
  email: String,     // Unique email address
  fullName: String,  // User's full name
  password: String   // Hashed password
}
```

