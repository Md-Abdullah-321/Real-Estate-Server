import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        console.log(userId, req.body);
        if (!userId) {
            throw { status: 401, message: "Unauthorized: UserId not provided" };
        }

        
        req.user = await User.findById(userId);
        next();
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};
