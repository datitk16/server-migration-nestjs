

export const config = {
    auth: {
        secretKey: process.env.JWT_AUTH_SECRET_KEY,
        expiresIn: process.env.JWT_AUTH_EXPIRES_IN || '30d',
        refreshExpiresIn: process.env.JWT_AUTH_REFRESH_EXPIRES_IN || '2d',
    }
}