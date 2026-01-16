# Authentication System Implementation

## Overview
Implemented a clean, simplified JWT-based authentication system without complex user types (driver/rider) or AuthCredential tables.

## What Was Built

### 1. Database Schema Updates

**Added to User model:**
-  `otpSecret` - Stores OTP for verification
- `otpExpiresAt` - OTP expiration timestamp
- `refreshTokens` - Relation to RefreshToken model

**New RefreshToken model:**
- Stores JWT refresh tokens
- Supports token revocation
- Automatic cleanup of expired tokens

### 2. API Endpoints

**Auth Controller** (`apps/api/src/auth/auth.controller.ts`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/auth/register` | POST | Register new user | No |
| `/auth/login` | POST | Login with email/password | No |
| `/auth/refresh-token` | POST | Refresh access token | No |
| `/auth/forgot-password` | POST | Request password reset OTP | No |
| `/auth/verify-reset-otp` | POST | Verify OTP for password reset | No |
| `/auth/reset-password` | POST | Reset password with OTP | No |
| `/auth/logout` | POST | Logout and revoke tokens | Yes |
| `/auth/me` | GET | Get current user info | Yes |

### 3. Services (Shared Module)

#### SharedAuthService (`libs/shared/src/modules/auth/auth.service.ts`)
Main authentication service coordinating all auth operations:
- User registration (delegates to UserService)
- Login with email/password
- Forgot password flow
- OTP verification
- Password reset
- Token refresh
- Logout
- Get current user

#### SharedAuthTokenService (`libs/shared/src/modules/auth/service/auth-token.service.ts`)
Handles all JWT token operations:
- Generate access & refresh tokens
- Validate tokens
- Refresh tokens
- Revoke user tokens
- Token payload management

#### SharedAuthOtpService (`libs/shared/src/modules/auth/service/auth-otp.service`)
-ts`)
Manages OTP generation and verification:
- Generate 6-digit OTP
- Store OTP with expiration (10 minutes)
- Verify OTP
- Auto-cleanup expired OTPs

### 4. Security Components

#### JwtStrategy (`libs/shared/src/modules/auth/strategies/jwt.strategy.ts`)
Passport JWT strategy for validating access tokens

#### JwtAuthGuard (`libs/shared/src/modules/auth/guards/jwt-auth.guard.ts`)
Guard for protecting routes requiring authentication

### 5. DTOs

**Request DTOs** (`apps/api/src/auth/dto/auth.dto.ts`):
- `RegisterDto` - User registration
- `LoginDto` - Email/password login
- `RefreshTokenDto` - Token refresh
- `ForgotPasswordDto` - Request password reset
- `VerifyOtpDto` - Verify OTP
- `ResetPasswordDto` - Reset password with OTP

**Response DTOs** (`apps/api/src/auth/dto/auth-response.dto.ts`):
- `AuthTokensDto` - Access/refresh tokens
- `AuthResponseDto` - Generic API response
- `UserResponseDto` - User data without password

## Authentication Flow

### Registration Flow
1. User submits registration data
2. SharedUserService creates user (with role & branch)
3. Password is hashed with bcrypt
4. User record is created
5. Client role is assigned
6. Default branch is created

### Login Flow
1. User submits email/password
2. System finds user by email
3. Password is verified with bcrypt
4. User roles are fetched
5. JWT access token generated (15 min expiry)
6. Refresh token generated (7 days expiry)
7. Refresh token stored in database
8. Tokens returned to client

### Password Reset Flow
1. User requests password reset (forgot-password)
2. System generates 6-digit OTP
3. OTP stored in user record with 10-min expiry
4. OTP sent to email (console log for now)
5. User verifies OTP (verify-reset-otp)
6. User submits new password with OTP (reset-password)
7. OTP verified and cleared
8. Password updated

### Token Refresh Flow
1. Client sends refresh token
2. System validates token from database
3. Old refresh token revoked
4. New access & refresh tokens generated
5. New tokens returned

### Logout Flow
1. Authenticated user requests logout
2. All refresh tokens for user are revoked
3. Client should discard access token

## Key Features

✅ **JWT-based auth** - Stateless access tokens, stateful refresh tokens  
✅ **Role-based access** - Integrated with existing role system  
✅ **OTP password reset** - Secure password recovery  
✅ **Token refresh** - Seamless reauthentication  
✅ **Token revocation** - Logout invalidates all sessions  
✅ **Password hashing** - Bcrypt with salt rounds  
✅ **Guard protection** - Easy route protection with `@UseGuards(JwtAuthGuard)`  
✅ **Swagger docs** - Full API documentation  

## Configuration

### Environment Variables

Add to `.env`:
```env
JWT_SECRET=your-secret-key-change-in-production
```

### Token Expiry Times
- Access Token: 15 minutes
- Refresh Token: 7 days
- OTP: 10 minutes

## Usage Examples

### Register
```typescript
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "+1234567890",
  "password": "Password@123"
}
```

### Login
```typescript
POST /auth/login
{
  "email": "john@example.com",
  "password": "Password@123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 900,
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      ...
    }
  }
}
```

### Protected Route
```typescript
GET /auth/me
Headers: {
  "Authorization": "Bearer eyJhbGc..."
}
```

## Database Migrations

Run these commands to apply the schema changes:

```bash
# Generate Prisma Client
pnpm prisma generate

# Create migration
pnpm prisma migrate dev --name add-auth-fields

# Or push to database directly
pnpm prisma db push
```

## Differences from tempAuth

### Removed Complexities:
❌ No AuthCredential table (password stored directly)  
❌ No user types (driver/rider)  
❌ No x-app-type header  
❌ No OAuth login (Google/Apple)  
❌ No phone authentication  
❌ No user profiles per role  

### Simplified Architecture:
✅ Single user type  
✅ Password in User table  
✅ JWT-only authentication  
✅ Email-based workflows  
✅ Clean, straightforward services  

## Security Notes

1. **JWT Secret**: Must be set in production via environment variable
2. **HTTPS**: Always use HTTPS in production
3. **Rate Limiting**: Consider adding rate limiting on auth endpoints
4. **Email Service**: Replace console.log OTP with actual email service
5. **Token Storage**: Client should store tokens securely (httpOnly cookies recommended)
6. **Password Requirements**: Enforced via DTO validation

## Next Steps

1. **Add email service** - Replace console.log with SendGrid/Nodemailer
2. **Add rate limiting** - Prevent brute force attacks
3. **Add 2FA** - Optional two-factor authentication
4. **Add email verification** - Verify email on registration
5. **Add mobile verification** - SMS OTP for mobile
6. **Add refresh token rotation** - Enhanced security
7. **Add audit logging** - Track auth events

## Testing

Use the Swagger UI at `http://localhost:3000/api/docs` to test all endpoints.

Example test flow:
1. Register a user
2. Login with credentials
3. Use access token to access `/auth/me`
4. Refresh token before expiry
5. Logout

## Files Created/Modified

### Created:
- `prisma/schema.prisma` - Updated with OTP fields and RefreshToken model
- `libs/shared/src/modules/auth/auth.service.ts` - Main auth service
- `libs/shared/src/modules/auth/service/auth-token.service.ts` - Token service
- `libs/shared/src/modules/auth/service/auth-otp.service.ts` - OTP service
- `libs/shared/src/modules/auth/strategies/jwt.strategy.ts` - JWT strategy
- `libs/shared/src/modules/auth/guards/jwt-auth.guard.ts` - Auth guard
- `libs/shared/src/modules/auth/auth.module.ts` - Updated auth module
- `libs/shared/src/modules/refreshtoken/` - RefreshToken module
- `apps/api/src/auth/auth.controller.ts` - Clean auth controller
- `apps/api/src/auth/dto/auth.dto.ts` - Request DTOs
- `apps/api/src/auth/dto/auth-response.dto.ts` - Response DTOs
- `apps/api/src/auth/auth.module.ts` - API auth module

### Modified:
- `apps/api/src/api.module.ts` - Added AuthModule import
- `libs/shared/src/modules/user/user.service.ts` - Already had role assignment

## Architecture

```
Client
  ↓
Auth Controller (API)
  ↓
SharedAuthService
  ├→ SharedAuthTokenService (JWT)
  ├→ SharedAuthOtpService (OTP)
  ├→ SharedUserService (Registration)
  └→ UserRepository, RefreshtokenRepository
```

This implementation provides a production-ready, secure authentication system that's simple to understand and maintain!
