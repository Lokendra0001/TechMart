const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    fullName: {
        type: String,
        minLength: 3,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 3,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?semt=ais_hybrid&w=740"
    },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number },
            _id: false
        }
    ],
    contactNo: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: "I enjoy shopping for quality products and great deals. I’ve been a customer since June 2025 and love using fast delivery and secure checkout features."
    }

}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
const User = model('user', userSchema);


module.exports = User;