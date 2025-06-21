const { Router } = require('express');
const router = Router();

const { Stripe } = require("stripe")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.get('/', (req, res) => {
    res.json("This is my Home Page.")
})

// This is related to the Strip Payment Gateway
router.post("/api/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.productId.productName,
                images: [product.productId.productImg?.[0] || "https://via.placeholder.com/150"],
            },
            unit_amount: Math.round((product.productId.price - product.productId.discount) * 100),
        },
        quantity: product.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/payment-successfull",
            cancel_url: "http://localhost:5173/cart",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;