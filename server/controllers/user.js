const User = require("../models/user-model");
const { generateTokenAndCookie } = require("../utils/auth")

const handleCreateUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        console.log(req.body)

        const user = await User.findOne({ email });
        if (user) {
            return res.status(503).json({ message: "User already created. Please Login" })
        }
        console.log(req.file)

        await User.create({ fullName, email, password, profilePic: req.file.path });
        res.status(201).send({ message: "SignUp Successfully!" })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const handleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Not Found!" });

        const isPassword = await user.comparePassword(password);
        if (!isPassword) return res.status(401).json({ message: "Password Is Incorrect!" });

        generateTokenAndCookie(res, user);

        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS only in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None for cross-origin, Lax for local dev
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        // ✅ Remove password before sending user object
        const { password: _, ...userWithoutPassword } = user._doc;


        return res.status(201).json({ message: "Login Successfully!", userWithoutPassword })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const handleLogoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS only in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None for cross-origin, Lax for local dev
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        return res.status(200).json({ message: "Logout Successfully!" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const handleGetCurrentUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password');
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const handleEditBio = async (req, res) => {
    try {
        const { fullName, email, bio, contactNo } = req.body;
        const updatedUser = await User.findOneAndUpdate({ email: email }, { fullName, bio, email, contactNo }, { new: true });
        return res.status(200).json(updatedUser)
    } catch (error) {
        res.json(error)
    }
}

const handleEditAvator = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ email: req.body.email }, { profilePic: req.file.path }, { new: true });
        return res.status(200).json(updatedUser)
    } catch (error) {
        res.json(error)
    }
}


const handleAddToCart = async (req, res) => {
    try {
        const { id, email } = req.body;
        const user = await User.findOne({ email });

        const existingItem = user.cart.find(item =>
            item.productId?.toString() === id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({ productId: id, quantity: 1 });
        }

        await user.save();
        res.status(200).json({ message: "Added to Cart", user });

    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ error: error.message });
    }

}


const handleUpdateQuantity = async (req, res) => {
    try {
        const { id, userId, qty } = req.body;

        const user = await User.findOne({ _id: userId });
        const index = user.cart.findIndex(
            (product) => product.productId.toString() === id
        );

        if (index !== -1) user.cart[0].quantity = qty;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handleDeleteProduct = async (req, res) => {
    try {
        const { id, userId } = req.body;

        const user = await User.findOne({ _id: userId });
        const index = user.cart.findIndex(
            (product) => product.productId.toString() === id
        );

        if (index !== -1) user.cart.splice(index, 1);

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleRemoveProductFromCart = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId)
        const user = await User.findOne({ _id: userId });
        // console.log(user)
        user.cart.splice(0, user.cart.length)
        await user.save();
        console.log(user)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

const handleGetCartProducts = async (req, res) => {
    try {
        const { id } = req.headers;
        const cartProducts = await User.findOne({ _id: id }).populate('cart.productId');
        return res.send(cartProducts)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    handleCreateUser,
    handleLoginUser,
    handleLogoutUser,
    handleGetCurrentUser,
    handleEditAvator,
    handleEditBio,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveProductFromCart,
    handleDeleteProduct,
    handleGetCartProducts
}