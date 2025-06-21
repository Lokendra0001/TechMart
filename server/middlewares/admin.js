const { getAdminByToken } = require("../utils/admin")

const checkAdminAuthentication = (req, res, next) => {
    req.admin = null;
    const token = req.cookies.adminToken;
    if (!token) return res.status(401).json({ message: "Please Login First!" });

    const admin = getAdminByToken(token);
    if (!admin) return res.status(401).json({ message: "Invalid Token!" });
    req.admin = admin;
    next();
}

module.exports = checkAdminAuthentication;