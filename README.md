
# BOOKTOWN - Full Stack Book E-commerce Website

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)  
![React](https://img.shields.io/badge/React-18.0-blue)  
![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey)  
![Status](https://img.shields.io/badge/Status-Under_Construction-yellow)

A full-featured book e-commerce platform with an admin dashboard, user accounts, and a complete book/order management system.

---

## Features

###  Frontend (React + Vite)
- **User Interface**
  - Built with **Vite** for faster development and hot reloading
  - Responsive design (mobile-first)
  - Book listings with filters (by name, author, ISBN)
  - Book detail pages  
  - Shopping cart  
  - User profile management

- **Admin Panel**
  - CRUD operations for books
  - User management
  - Order processing
  - Discount management
  - Basic sales analytics dashboard

---

### Backend (Express.js)
- **Core Functionality**
  - RESTful API with JWT-based authentication
  - Book search (basic — no pagination yet)
  - Complete order processing workflow
  - Image upload support via Cloudinary

---

## Tech Stack

### Frontend
- **Framework**: React 18 (bootstrapped with **Vite**)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + CSS Modules
- **Routing**: React Router v6
- **Icons**: Material UI Icons

### Backend
- **Runtime**: Node.js 22.14.0
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT & Bcrypt
- **Image Upload**: Cloudinary  
<!-- - **Validation**: Joi -->
<!-- - **API Documentation**: Swagger UI -->

---

## Project Structure

```

booktown/
├── react-frontend/           # Frontend (Vite + React)
│   ├── public/               # Static files
│   └── src/
│       ├── adminComponents/  # Admin-specific components
│       ├── components/       # Reusable UI components
│       ├── config/           # API config & base URLs
│       ├── state/            # Redux logic
│       ├── userComponents/   # User-facing components
│       ├── utils/            # Utility functions
│       ├── appContent.js
│       └── App.jsx
│
└── express-backend/          # Backend (Express)
├── config/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
└── app.js

````

---

## Installation Guide

### Prerequisites
- Node.js `22.14.0`
- npm `10.9.2`
- MongoDB `6.16.0`

---

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd express-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Add environment variables:

   ```env
   PORT=5000
   DATABASE=mongodb://localhost:27017/bookshop
   JWT_SECRET=your-secret-key-here
   HASHID_SALT=some-secure-random-string
   ```

---

###Frontend Setup (Vite + React)

1. Navigate to the frontend folder:

   ```bash
   cd ../react-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Add environment variables:

   ```env
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

---

##  Running the Application

### Development Mode

1. Start the frontend (Vite dev server):

   ```bash
   cd react-frontend
   npm run dev
   ```

2. Start the backend server:

   ```bash
   cd express-backend
   npm start
   ```

---

## Frontend Routes

| Route            | Description                  |
| ---------------- | ---------------------------- |
| `/` or `/home`   | Homepage with featured books |
| `/login`         | User login                   |
| `/signup`        | User registration            |
| `/profile`       | User profile                 |
| `/books`         | Book list with filters       |
| `/books/:hashid` | Single book details          |
| `/cart`          | Shopping cart                |

### Admin Routes

| Route                       | Description          |
| --------------------------- | -------------------- |
| `/adminDashboard`           | Admin dashboard      |
| `/adminDashboard/books`     | Book management      |
| `/adminDashboard/users`     | User management      |
| `/adminDashboard/orders`    | Orders management    |
| `/adminDashboard/discounts` | Discounts management |

---

<!-- ## 📘 API Documentation

Visit:
```
http://localhost:5000/api-docs
``` -->

---

## Status

 This project is currently under active development. More features and improvements are on the way.
