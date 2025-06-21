const jwt = require('jsonwebtoken')

const generateTokenAndCookie = (res, user) => {

    const payload = {
        fullName: user.fullName,
        email: user.email,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token)
    res.cookie("token", token, {
        httpOnly: true,      // Prevents JavaScript access (recommended for auth)
        // Or "None" if using cross-origin with credentials
        maxAge: 7 * 24 * 60 * 60 * 1000, // Optional: 7 days
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