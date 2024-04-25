import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) {
            throw { status: 401, message: "Unauthorized: Access token not provided" };
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};
