# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `400` - User already exists
- `500` - Server error

---

### Login User

**POST** `/auth/login`

Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `401` - Invalid credentials
- `500` - Server error

---

## Analysis Endpoints

### Analyze Code

**POST** `/analysis/analyze`

Analyze code and get issues, metrics, and AI suggestions.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "code": "function test() { return 1; }",
  "fileName": "test.js",
  "language": "javascript"
}
```

**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "fileName": "test.js",
  "language": "javascript",
  "code": "function test() { return 1; }",
  "issues": [
    {
      "type": "naming",
      "severity": "info",
      "line": 1,
      "message": "Function name is too short. Use descriptive names."
    }
  ],
  "suggestions": [
    "Consider using more descriptive function names",
    "Add JSDoc comments for better documentation",
    "Consider adding error handling"
  ],
  "metrics": {
    "complexity": 1,
    "maintainability": 98,
    "linesOfCode": 1
  },
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Errors:**
- `401` - Unauthorized
- `500` - Analysis failed

---

### Get Analysis History

**GET** `/analysis/history`

Get user's analysis history (last 20 analyses).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "fileName": "test.js",
    "language": "javascript",
    "issues": [...],
    "suggestions": [...],
    "metrics": {
      "complexity": 1,
      "maintainability": 98,
      "linesOfCode": 1
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

**Note:** Code content is excluded from history responses for performance.

**Errors:**
- `401` - Unauthorized
- `500` - Server error

---

## Stats Endpoints

### Get Dashboard Stats

**GET** `/stats/dashboard`

Get aggregated statistics for dashboard.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "total": 25,
  "totalIssues": 47,
  "cleanFiles": 8,
  "avgComplexity": 12,
  "avgMaintainability": 85,
  "recentAnalyses": [...]
}
```

**Errors:**
- `401` - Unauthorized
- `500` - Server error

---

## Data Models

### User
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  createdAt: Date
}
```

### Analysis
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  fileName: string,
  language: string,
  code: string,
  issues: [
    {
      type: string,
      severity: 'error' | 'warning' | 'info',
      line: number,
      message: string
    }
  ],
  suggestions: string[],
  metrics: {
    complexity: number,
    maintainability: number,
    linesOfCode: number
  },
  createdAt: Date
}
```

---

## Issue Types

### Complexity
- Too many function parameters
- High cyclomatic complexity
- Deeply nested conditions

### Naming
- Short variable names
- Non-descriptive identifiers

### Syntax
- Parse errors
- Invalid code structure

---

## Severity Levels

- **error**: Critical issues that prevent code execution
- **warning**: Issues that should be addressed
- **info**: Suggestions for improvement

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding in production:
- 100 requests per 15 minutes per IP
- 50 analysis requests per hour per user

---

## Error Response Format

```json
{
  "message": "Error description"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `500` - Internal Server Error

---

## Example Usage

### JavaScript (Fetch)

```javascript
// Register
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});
const { token } = await response.json();

// Analyze Code
const analysis = await fetch('http://localhost:5000/api/analysis/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    code: 'function test() { return 1; }',
    fileName: 'test.js',
    language: 'javascript'
  })
});
const result = await analysis.json();
```

### cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Analyze Code
curl -X POST http://localhost:5000/api/analysis/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"code":"function test() { return 1; }","fileName":"test.js","language":"javascript"}'
```
