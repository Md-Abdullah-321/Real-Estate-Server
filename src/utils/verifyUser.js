import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    // Check if the request originates from your client application
    const allowedOrigin = 'https://real-estate-client-tau.vercel.app';
    if (req.headers.origin === allowedOrigin) {
        // Allow unrestricted access for requests from the client
        return next();
    }

    // For requests from other origins, continue with token verification
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }

        req.user = user;
        next();
    });
};
