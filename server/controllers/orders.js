const Order = require("../models/orders-model")
const Product = require("../models/product-model")

const handlePrePendingOrder = async (req, res) => {
    const { userId, products } = req.body;
    console.log(req.body)

    try {
        const formattedProducts = products.map((p) => ({
            product: p.productId._id,
            quantity: p.quantity
        }));

        const newOrder = {
            products: formattedProducts,
            userId: userId,
            status: "pending"
        };

        const yourOrder = await Order.create(newOrder)
        res.status(200).json({ message: "Order stored successfully", yourOrder });
    } catch (error) {
        console.error("Error saving order:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const handleOrderConfirmed = async (req, res) => {

    try {
        const orders = await Order.find({});
        const lastOrder = orders[orders.length - 1];
        if (lastOrder) {
            lastOrder.status = "success";
            await lastOrder.save();
            return res.status(200).json({ message: "Order status updated", orders });
        };

        // res.status(200).json({ message: "Order stored successfully" });
    } catch (error) {
        console.error("Error saving order:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const handleGetAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.headers["_id"] });

        const populatedOrders = await Promise.all(
            orders.map(async (order) => {
                const populatedProducts = await Promise.all(
                    order.products.map(async (item) => {
                        const productDetails = await Product.findById(item.product);
                        return {
                            ...item.toObject(),
                            product: productDetails, // Replace ID with actual data
                        };
                    })
                );

                return {
                    ...order.toObject(),
                    products: populatedProducts,
                };
            })
        );

        res.status(200).json(populatedOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    handlePrePendingOrder,
    handleOrderConfirmed,
    handleGetAllOrders
}