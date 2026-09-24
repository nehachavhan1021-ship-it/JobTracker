const jwt = require("jsonwebtoken");

const authMiddleware = (
    req,
    res,
    next
) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message:
                    "Authentication required"
            });
        }


        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer" ||
            !parts[1]
        ) {
            return res.status(401).json({
                message:
                    "Invalid authorization format"
            });
        }


        const token = parts[1];


        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        if (!decoded.userId) {
            return res.status(401).json({
                message:
                    "Invalid authentication token"
            });
        }


        req.user = decoded;

        next();

    } catch (error) {

        if (
            error.name ===
            "TokenExpiredError"
        ) {
            return res.status(401).json({
                message:
                    "Your session has expired. Please login again."
            });
        }

        return res.status(401).json({
            message:
                "Invalid authentication token"
        });
    }
};

module.exports = authMiddleware;