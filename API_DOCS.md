# API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

### Register
Create a new user account.

- **URL**: `/auth/register`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "name": "John Doe",
    "nim": "1234567890",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response** (201 Created):
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "nim": "1234567890"
    }
  }
  ```
- **Error Response** (409 Conflict):
  ```json
  { "message": "User with this Email or NIM already exists" }
  ```

### Login
Authenticate a user.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "nim": "1234567890"
    }
  }
  ```
- **Error Response** (401 Unauthorized):
  ```json
  { "message": "Invalid credentials" }
  ```

## User Management

### List Users
Get a list of all registered users.

- **URL**: `/users`
- **Method**: `GET`
- **Success Response** (200 OK):
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "nim": "1234567890"
    }
  ]
  ```

### Get User Detail
Get details of a specific user.

- **URL**: `/users/:id`
- **Method**: `GET`
- **Success Response** (200 OK):
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "nim": "1234567890"
  }
  ```
- **Error Response** (404 Not Found):
  ```json
  { "message": "User not found" }
  ```

### Update User
Update a user's information.

- **URL**: `/users/:id`
- **Method**: `PUT`
- **Body** (JSON):
  ```json
  {
    "name": "John Updated",
    "nim": "0987654321",
    "email": "john.updated@example.com"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "nim": "0987654321"
  }
  ```

### Delete User
Delete a user account.

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Success Response** (200 OK):
  ```json
  { "message": "User deleted successfully" }
  ```
