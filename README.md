# Blog App

This project is a simple blog application built with Node.js, Express, and MySQL. It allows users to register, log in, update their profiles, and manage blogs. The backend provides RESTful APIs for user and blog operations, including creating, updating, searching, and deleting users and blogs.

## Features

- User registration, login, profile management, and search
- Blog creation, update, retrieval, and deletion
- MySQL database integration
- Modular code structure with separate controllers and services

## Structure

- `index.js`: Entry point, initializes the Express app and routes
- `app/DB/DBConnection.js`: Database connection setup
- `app/modules/userModule/`: User-related controllers and services
- `app/modules/blogModule/`: Blog-related controllers and services
- `app/modules/bootstrap.js`: Route and middleware setup

## Getting Started

1. Install dependencies:  
   `npm install`
2. Start the server:  
   `node index.js`
3. The server runs at `http://localhost:3000`
