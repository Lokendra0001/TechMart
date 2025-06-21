const jwt = require('jsonwebtoken')

const generateTokenAndCookie = (res, user) => {

    const payload = {
        fullName: user.fullName,
        email: user.email,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("token", token, token, {
        httpOnly: true,
        secure: true,                  // MUST be true for SameSite=None
        sameSite: "None",              // Required for cross-origin
        maxAge: 7 * 24 * 60 * 60 * 1000,
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