# IT-Path-Solution-Task

## Overview

The Provided by IT Path Solution is a Node.js application built with Express.js, MongoDB, and Socket.IO. It includes user authentication with JWT, real-time messaging using SocketIO, and scalable APIs for chat and user management. The project is designed with clean, maintainable code, proper error handling, and tests for critical components.

## Features

- **User Management**: Sign up, Sign in, and user authentication using JWT.
- **Real-Time Messaging**: Users can join chat rooms and communicate in real time. Messages are broadcasted and saved in MongoDB.
- **Scalable APIs**: APIs for message retrieval (with pagination) and user management.
- **Socket.IO Integration**: Real-time communication via Sockets, secured with JWT authentication.
- **API Documentation**: Swagger for API documentation.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sagar409-conflict/IT-Path-Solution-Task.git

   ```

2. **Install Dependencies**

   ```bash
   npm i

   ```

3. **Environment Setup**

- Create a .env file in the root directory of your project.
- Copy the content from .env.example and update the values as necessary.

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/Practical-IT-Path
JWT_SECRET="jwt_secret_key" (Take from env.example)


```

4. **Run the Application**

   ```bash
   nodemon app.js

   ```

## API Endpoints

### Authentication

#### 1. Sign Up - Register a New User

- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Description**: Registers a new user by creating an account with their details.
- **Request Body**:

  ```json
  {
    "name": "Sagar",
    "email": "sagar@gmail.com",
    "password": "password123"
  }
  ```

  #### 2. Sign In - User Login

- **URL**: `/api/auth/signin`
- **Method**: `POST`
- **Description**: Authenticates the user and returns a JWT.
- **Request Body**:

  ```json
  {
    "email": "sagar@gnail.com",
    "password": "password123"
  }
  ```

  ### User Management

#### 1. Get User Details

- **URL**: `/api/user/:id`
- **Method**: `GET`
- **Description**: Fetches details of a specific user by ID. Requires authentication.
- **Headers**:

  - `Authorization: Bearer <user's_jwt_token_>`

#### 2. Update User Information

- **URL**: `/api/user/:id`
- **Method**: `PUT`
- **Description**: Updates user details (e.g., name or email). Requires authentication.
- **Headers**:
  - `Authorization: Bearer <user's_jwt_token>`
- **Request Body**:
  ```json
  {
    "username": "sagar",
    "email": "sagar@gmail.com"
  }
  ```

### Chat

#### 1. Retrieve Messages from a Chat Room (with Pagination)

- **URL**: `/api/messages/:room`
- **Method**: `GET`
- **Description**: Fetches messages from a specific chat room with pagination.
- **Headers**:
  - `Authorization: Bearer <user's_jwt_token>`
- **Query Parameters**:
  - `page`: The page number (optional, default is `1`).
  - `limit`: The number of messages per page (optional, default is `10`).

### Error Responses

- `400 Bad Request`: Invalid input or request parameters.
- `401 Unauthorized`: Missing or invalid authentication token.
- `404 Not Found`: Requested resource (user, messages, etc.) not found.
- `500 Internal Server Error`: Server-side errors.

### Socket.IO Events

- `connect`: Establish a socket connection.
- `joinRoom`: Join a chat room.
- `message`: Receive messages in real time.
- `disconnect`: Handle socket disconnection.

### API Documentation

- The project uses Swagger for API documentation. You can access it at /api-docs after starting the application.
  Link : [Swagger API Documentation](http://localhost:4020/api-docs)

### Environment Variables

The following environment variables are required for the application:

- `PORT`: The port the app will run on (default: 3000).In this task there is 4020 assigned
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWTs.

### Security Considerations

- Passwords are hashed using bcrypt.
- JWT is used for authentication to secure API endpoints and Socket connections.
- Sensitive information like JWT secrets is stored in environment variables.

### Future Enhancements

- Add role-based access control (RBAC).
- Implement file-sharing functionality in chat rooms. For Users also take Profile Images and other additional details
- Add more extensive error logging and monitoring.(using winston or logger either we can user 3rd party tool to manage continuous logs)
