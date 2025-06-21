// config/cloudinary-config.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getStorage = (folderName) => {
    return new CloudinaryStorage({
        cloudinary,
        params:
        {
            folder: `techMart/${folderName}`, //folder name inside the techmart
            allowed_formats: ['jpg', 'png', 'jpeg', 'avif'],
        }

    });
};

module.exports = { cloudinary, getStorage };
