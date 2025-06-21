const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    status: { type: String, default: "pending" },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true },
            _id: false
        }
    ]
}, { timestamps: true }); // optional: adds createdAt and updatedAt

const Order = model('orders', orderSchema);

module.exports = Order