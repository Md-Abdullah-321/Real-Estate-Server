import User from "../models/user.model";

export const verifyToken = async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log(userId);
        if (!userId) {
            throw { status: 401, message: "Unauthorized: UserId not provided" };
        }

        
        req.user = await User.findById(userId);
        next();
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};
