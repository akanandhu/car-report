/**
 * Authentication roles used throughout the application
 */
export enum AuthRole {
  SUPER_ADMIN = 'super_admin',
  CLIENT = 'client',
  STAFF = 'staff',
  RIDER = 'rider',
  DRIVER = 'driver',
}

/**
 * OAuth providers supported by the application
 */
export enum AuthProvider {
  GOOGLE = 'google',
  APPLE = 'apple',
  FACEBOOK = 'facebook',
}

