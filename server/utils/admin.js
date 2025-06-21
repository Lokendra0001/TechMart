const jwt = require('jsonwebtoken')


const generateTokenAndAdminCookie = (res, admin) => {

    const payload = {
        fullName: admin.fullName,
        email: admin.email,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("adminToken", token, token, {
        httpOnly: true,
        secure: true,                  // MUST be true for SameSite=None
        sameSite: "None",              // Required for cross-origin
        maxAge: 7 * 24 * 60 * 60 * 1000,
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