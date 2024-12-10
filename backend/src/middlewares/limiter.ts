import rateLimit from 'express-rate-limit';

// Define rate limiter for email sending
export const emailRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1, // Limit each IP to 1 request per windowMs
    message: {
        message: 'You can only send one email per minute. Please try again later.',
    },
});