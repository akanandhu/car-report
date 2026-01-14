# User API Documentation

This document provides details about the User Management API endpoints.

## Base URL
```
http://localhost:3000
```

## Swagger Documentation
Interactive API documentation is available at:
```
http://localhost:3000/api/docs
```

## Endpoints

### 1. Register User
**POST** `/users/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "mobile": "+1234567890",
  "password": "Password@123",
  "clientId": "123e4567-e89b-12d3-a456-426614174000" // Optional
}
```

**Response (201 CREATED):**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "mobile": "+1234567890",
    "clientId": null,
    "mobileVerifiedAt": null,
    "emailVerifiedAt": null,
    "createdAt": "2024-01-14T10:30:00.000Z",
    "updatedAt": "2024-01-14T10:30:00.000Z",
    "deletedAt": null
  },
  "message": "User registered successfully",
  "statusCode": 201
}
```

**Validation Rules:**
- `name`: Required, minimum 2 characters
- `email`: Required, valid email format
- `mobile`: Required, valid phone number format
- `password`: Required, minimum 8 characters, must contain uppercase, lowercase, number, and special character
- `clientId`: Optional, valid UUID

---

### 2. Update User
**PUT** `/users/:id`

Update user information.

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "mobile": "+1234567890",
  "clientId": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "mobile": "+1234567890",
    "clientId": "123e4567-e89b-12d3-a456-426614174000",
    "mobileVerifiedAt": null,
    "emailVerifiedAt": null,
    "createdAt": "2024-01-14T10:30:00.000Z",
    "updatedAt": "2024-01-14T11:30:00.000Z",
    "deletedAt": null
  },
  "message": "User updated successfully",
  "statusCode": 200
}
```

---

### 3. Change Password
**PUT** `/users/:id/change-password`

Change user password.

**Request Body:**
```json
{
  "currentPassword": "OldPassword@123",
  "newPassword": "NewPassword@123",
  "confirmPassword": "NewPassword@123"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "message": "Password changed successfully"
  },
  "message": "Password changed successfully",
  "statusCode": 200
}
```

**Validation Rules:**
- `currentPassword`: Required
- `newPassword`: Required, minimum 8 characters, must contain uppercase, lowercase, number, and special character
- `confirmPassword`: Required, must match `newPassword`

---

### 4. Get User by ID
**GET** `/users/:id`

Retrieve a single user by their ID.

**Response (200 OK):**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "mobile": "+1234567890",
    "clientId": null,
    "mobileVerifiedAt": null,
    "emailVerifiedAt": null,
    "createdAt": "2024-01-14T10:30:00.000Z",
    "updatedAt": "2024-01-14T10:30:00.000Z",
    "deletedAt": null
  },
  "message": "User retrieved successfully",
  "statusCode": 200
}
```

---

### 5. List Users (with Pagination)
**GET** `/users`

Retrieve a paginated list of users with optional search.

**Query Parameters:**
- `page` (optional): Page number (default: 1, minimum: 1)
- `limit` (optional): Items per page (default: 10, minimum: 1, maximum: 100)
- `search` (optional): Search term to filter users by name, email, or mobile

**Example Request:**
```
GET /users?page=1&limit=10&search=john
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "mobile": "+1234567890",
      "clientId": null,
      "mobileVerifiedAt": null,
      "emailVerifiedAt": null,
      "createdAt": "2024-01-14T10:30:00.000Z",
      "updatedAt": "2024-01-14T10:30:00.000Z",
      "deletedAt": null
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 10,
    "total": 100,
    "totalPages": 10,
    "hasPreviousPage": false,
    "hasNextPage": true
  },
  "message": "Users retrieved successfully",
  "statusCode": 200
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["name must be at least 2 characters"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Current password is incorrect",
  "error": "Unauthorized"
}
```

---

## Common Response DTOs

### ResponseDto
Used for single item responses:
```typescript
{
  data: T;
  message: string;
  statusCode: number;
}
```

### PaginatedResponseDto
Used for paginated list responses:
```typescript
{
  data: T[];
  pagination: PaginationMetaDto;
  message: string;
  statusCode: number;
}
```

### PaginationMetaDto
```typescript
{
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
```

---

## Testing the API

### Using cURL

1. **Register a user:**
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "mobile": "+1234567890",
    "password": "Password@123"
  }'
```

2. **List users:**
```bash
curl -X GET "http://localhost:3000/users?page=1&limit=10&search=john"
```

3. **Get user by ID:**
```bash
curl -X GET http://localhost:3000/users/123e4567-e89b-12d3-a456-426614174000
```

4. **Update user:**
```bash
curl -X PUT http://localhost:3000/users/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated"
  }'
```

5. **Change password:**
```bash
curl -X PUT http://localhost:3000/users/123e4567-e89b-12d3-a456-426614174000/change-password \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "OldPassword@123",
    "newPassword": "NewPassword@123",
    "confirmPassword": "NewPassword@123"
  }'
```

---

## Implementation Details

### Password Security
- Passwords are hashed using bcrypt with a salt round of 10
- Passwords are never returned in responses
- Password validation requires:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (@$!%*?&#)

### Soft Delete
- Users with `deletedAt` not null are excluded from list results
- Deleted users cannot be updated or retrieved

### Search Functionality
The search parameter filters users by:
- Name (case-insensitive partial match)
- Email (case-insensitive partial match)
- Mobile (partial match)

### Pagination
- Default page: 1
- Default limit: 10
- Maximum limit: 100
- Pagination metadata includes information about total pages and navigation
