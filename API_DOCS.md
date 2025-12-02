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

## Parking Areas

### List Parking Areas
Get a list of all parking areas.

- **URL**: `/parking-areas`
- **Method**: `GET`
- **Success Response** (200 OK):
  ```json
  [
    {
      "id": 1,
      "name": "Parkir Gedung A",
      "location": "Lantai 1, Gedung A",
      "type": "Motor",
      "capacity": 100,
      "available": 45,
      "price": "Rp 2.000/jam",
      "latitude": -6.2088,
      "longitude": 106.8456,
      "operatingHours": "24 Jam"
    }
  ]
  ```

### Get Parking Area Detail
Get details of a specific parking area.

- **URL**: `/parking-areas/:id`
- **Method**: `GET`
- **Success Response** (200 OK):
  ```json
  {
    "id": 1,
    "name": "Parkir Gedung A",
    "location": "Lantai 1, Gedung A",
    "type": "Motor",
    "capacity": 100,
    "available": 45,
    "price": "Rp 2.000/jam",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "operatingHours": "24 Jam"
  }
  ```
- **Error Response** (404 Not Found):
  ```json
  { "message": "Parking area not found" }
  ```

### Create Parking Area
Create a new parking area.

- **URL**: `/parking-areas`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "name": "Parkir Gedung A",
    "location": "Lantai 1, Gedung A",
    "type": "Motor",
    "capacity": 100,
    "available": 45,
    "price": "Rp 2.000/jam",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "operatingHours": "24 Jam"
  }
  ```
- **Success Response** (201 Created):
  ```json
  {
    "id": 1,
    "name": "Parkir Gedung A",
    "location": "Lantai 1, Gedung A",
    "type": "Motor",
    "capacity": 100,
    "available": 45,
    "price": "Rp 2.000/jam",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "operatingHours": "24 Jam"
  }
  ```

### Update Parking Area
Update a parking area's information.

- **URL**: `/parking-areas/:id`
- **Method**: `PUT`
- **Body** (JSON):
  ```json
  {
    "name": "Parkir Gedung A Updated",
    "location": "Lantai 2, Gedung A",
    "type": "Mobil",
    "capacity": 150,
    "available": 80,
    "price": "Rp 3.000/jam",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "operatingHours": "07:00 - 22:00"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "id": 1,
    "name": "Parkir Gedung A Updated",
    "location": "Lantai 2, Gedung A",
    "type": "Mobil",
    "capacity": 150,
    "available": 80,
    "price": "Rp 3.000/jam",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "operatingHours": "07:00 - 22:00"
  }
  ```

### Delete Parking Area
Delete a parking area.

- **URL**: `/parking-areas/:id`
- **Method**: `DELETE`
- **Success Response** (200 OK):
  ```json
  { "message": "Parking area deleted successfully" }
  ```

