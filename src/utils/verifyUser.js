import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    // Check if the request has a token in cookies
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized: Access token not provided'));
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Token verification failed
            return next(errorHandler(403, 'Forbidden: Invalid token'));
        }

        // Token verification succeeded, set user in request object
        req.user = user;
        next();
    });
};
