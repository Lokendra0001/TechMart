const jwt = require('jsonwebtoken')

const generateTokenAndCookie = (res, user) => {

    const payload = {
        fullName: user.fullName,
        email: user.email,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS only in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None for cross-origin, Lax for local dev
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


}



const getUserByToken = (token) => {
    if (!token) return false;

    const user = jwt.verify(token, process.env.JWT_SECRET)
    if (!user) return fasle;
    return user;
}

module.exports = {
    generateTokenAndCookie,
    getUserByToken
}