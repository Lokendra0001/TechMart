const Admin = require("../models/admin-model");
const { generateTokenAndAdminCookie } = require('../utils/admin');

const handleAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email })
        if (!admin) return res.status(404).json({ message: "Admin Not Found!" });

        const isPassword = await admin.comparePassword(password);
        if (!isPassword) return res.status(401).json({ message: "Password Is Incorrect!" });

        generateTokenAndAdminCookie(res, admin);

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,                  // MUST be true for SameSite=None
            sameSite: "None",              // Required for cross-origin
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })


        return res.status(201).json({ message: "Login Successfully!", admin })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const handleAdminLogout = async (req, res) => {
    try {

        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: true,                  // MUST be true for SameSite=None
            sameSite: "None",              // Required for cross-origin
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json("LogOut Successfully")
    } catch (error) {
        res.json(error)
    }
};

const handleGetAdmin = async (req, res) => {
    const admin = await Admin.findOne();
    res.status(200).json(admin)
};


module.exports = {
    handleAdminLogin,
    handleAdminLogout,
    handleGetAdmin
}