const jwt = require('jsonwebtoken')


const generateTokenAndAdminCookie = (res, admin) => {

    const payload = {
        fullName: admin.fullName,
        email: admin.email,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS only in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None for cross-origin, Lax for local dev
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

}

const getAdminByToken = (token) => {
    if (!token) return false;

    const admin = jwt.verify(token, process.env.JWT_SECRET)
    if (!admin) return fasle;
    return admin;
}

module.exports = {
    generateTokenAndAdminCookie,
    getAdminByToken
}