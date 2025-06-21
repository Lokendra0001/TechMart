const Product = require("../models/product-model");

const handleCreateProduct = async (req, res) => {
    try {
        const { productName, price, description, discount, category, rating } = req.body;
        console.log(req.files)

        // const isProduct = await Product.findOne({ productName });
        // if (isProduct) return res.status(409).json({ message: "Product Already There! You Can't create Same Product again." })

        const images = req.files.map(file => file.path);
        const createdProduct = await Product.create({ productName, price, productImg: images, description, discount, category, rating });
        return res.status(201).json({ message: "Product Created Successfully", createdProduct })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const handleGetAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (products) res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

const handleGetProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    return res.status(200).json(product)
};

module.exports = {
    handleCreateProduct,
    handleGetAllProducts,
    handleGetProduct
}