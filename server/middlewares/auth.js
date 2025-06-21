const { getUserByToken } = require("../utils/auth")

const checkAuthentication = (req, res, next) => {
    req.user = null;
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Please Login First!" });

    const isUser = getUserByToken(token);
    req.user = isUser;
    if (!isUser) return res.status(401).json({ message: "Invalid Token!" });
    next();
}

module.exports = checkAuthentication;