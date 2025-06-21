const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
    fullName: {
        type: String,
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
        default: "https://img.freepik.com/free-photo/portrait-smiling-man-sitting-cafe-bar-with-his-laptop-computer_342744-944.jpg?uid=R169142108&ga=GA1.1.961008397.1746420810&semt=ais_hybrid&w=740"
    },
    contactNo: {
        type: String,
    }
}, { timestamps: true })

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
})

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const Admin = model('admin', adminSchema);

module.exports = Admin;