const { Router } = require("express");
const Admin = require("../models/admin-model");
const multer = require('multer');
const { storage } = require('../config/cloudinary-config')
const router = Router();
const checkAdminAuthentication = require('../middlewares/admin');
const { handleGetAdmin, handleAdminLogout, handleAdminLogin } = require("../controllers/admin");

const upload = multer({ storage });

if (process.env.NODE_ENV == "development") {
    router.post('/create', upload.single('profilePic'), async (req, res) => {
        try {
            const { fullName, email, password } = req.body;

            const admins = await Admin.find();
            if (admins.length > 0) {
                return res.status(503).send("Admin already created You don't have permission to create another one.")
            }

            const admin = await Admin.create({ fullName, email, password, profilePic: req.file.path });
            res.status(201).send(admin)
        } catch (error) {
            res.status(500).send(error.message)
        }

    })
}

router.post("/signin", handleAdminLogin)

router.get("/logout", handleAdminLogout)


router.get("/getAdmin", checkAdminAuthentication, handleGetAdmin);
module.exports = router;