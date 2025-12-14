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

## Items (QR Code)

### List Items
Get a list of all items with optional search and location filter.

- **URL**: `/items`
- **Method**: `GET`
- **Query Parameters**:
  - `search` (optional): Search by name, description, or qrCode
  - `location` (optional): Filter by storage location
- **Success Response** (200 OK):
  ```json
  [
    {
      "id": 1,
      "qrCode": "ITEM-001-LAPTOP",
      "name": "Laptop Asus ROG Strix",
      "description": "Gaming laptop dengan RTX 4060",
      "quantity": 3,
      "storageLocation": "Gudang A, Rak 1, Slot A1",
      "imageUrl": null,
      "createdAt": "2024-12-14T04:30:00.000Z",
      "updatedAt": "2024-12-14T04:30:00.000Z"
    }
  ]
  ```

### Create Item
Create a new item with QR code.

- **URL**: `/items`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "qrCode": "ITEM-001-LAPTOP",
    "name": "Laptop Asus ROG Strix",
    "description": "Gaming laptop dengan RTX 4060",
    "quantity": 3,
    "storageLocation": "Gudang A, Rak 1, Slot A1",
    "imageUrl": "https://example.com/image.jpg"
  }
  ```
- **Success Response** (201 Created):
  ```json
  {
    "id": 1,
    "qrCode": "ITEM-001-LAPTOP",
    "name": "Laptop Asus ROG Strix",
    "description": "Gaming laptop dengan RTX 4060",
    "quantity": 3,
    "storageLocation": "Gudang A, Rak 1, Slot A1",
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2024-12-14T04:30:00.000Z",
    "updatedAt": "2024-12-14T04:30:00.000Z"
  }
  ```
- **Error Response** (409 Conflict):
  ```json
  { "message": "Item dengan QR Code tersebut sudah ada" }
  ```

### Get Item Detail
Get details of a specific item by ID.

- **URL**: `/items/:id`
- **Method**: `GET`
- **Success Response** (200 OK):
  ```json
  {
    "id": 1,
    "qrCode": "ITEM-001-LAPTOP",
    "name": "Laptop Asus ROG Strix",
    "description": "Gaming laptop dengan RTX 4060",
    "quantity": 3,
    "storageLocation": "Gudang A, Rak 1, Slot A1",
    "imageUrl": null,
    "createdAt": "2024-12-14T04:30:00.000Z",
    "updatedAt": "2024-12-14T04:30:00.000Z"
  }
  ```
- **Error Response** (404 Not Found):
  ```json
  { "message": "Item tidak ditemukan" }
  ```

### Scan QR Code
Search for an item by scanning its QR code. This is the main endpoint for mobile app QR scanning.

- **URL**: `/items/scan/:code`
- **Method**: `GET`
- **Success Response** (200 OK):
  ```json
  {
    "found": true,
    "item": {
      "id": 1,
      "qrCode": "ITEM-001-LAPTOP",
      "name": "Laptop Asus ROG Strix",
      "description": "Gaming laptop dengan RTX 4060",
      "quantity": 3,
      "storageLocation": "Gudang A, Rak 1, Slot A1",
      "imageUrl": null,
      "createdAt": "2024-12-14T04:30:00.000Z",
      "updatedAt": "2024-12-14T04:30:00.000Z"
    },
    "message": "Item ditemukan di Gudang A, Rak 1, Slot A1"
  }
  ```
- **Error Response** (404 Not Found):
  ```json
  {
    "found": false,
    "item": null,
    "message": "Item dengan QR Code tersebut tidak ditemukan"
  }
  ```

### Update Item
Update an item's information including storage location.

- **URL**: `/items/:id`
- **Method**: `PUT`
- **Body** (JSON):
  ```json
  {
    "name": "Laptop Asus ROG Strix G16",
    "storageLocation": "Gudang B, Rak 1, Slot A1",
    "quantity": 5
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "id": 1,
    "qrCode": "ITEM-001-LAPTOP",
    "name": "Laptop Asus ROG Strix G16",
    "description": "Gaming laptop dengan RTX 4060",
    "quantity": 5,
    "storageLocation": "Gudang B, Rak 1, Slot A1",
    "imageUrl": null,
    "createdAt": "2024-12-14T04:30:00.000Z",
    "updatedAt": "2024-12-14T05:00:00.000Z"
  }
  ```

### Delete Item
Delete an item.

- **URL**: `/items/:id`
- **Method**: `DELETE`
- **Success Response** (200 OK):
  ```json
  { "message": "Item berhasil dihapus" }
  ```
