export enum Errors {
    // General
    UNKNOWN_ERROR = 'Unknown error',

    // Users
    USER_NOT_FOUND = 'User not found',
    USER_ALREADY_EXISTS = 'User already exists',

    // Auth
    UNAUTHORIZED = 'Unauthorized',
    INVALID_TOKEN = 'Invalid token',
    TOKEN_EXPIRED = 'Token expired',
    FORBIDDEN = 'Forbidden',
    INVALID_CREDENTIALS = 'Invalid credentials',
    INVALID_REFRESH_TOKEN = 'Invalid refresh token',
}
