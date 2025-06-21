const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImg: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Product = model('products', productSchema);

module.exports = Product