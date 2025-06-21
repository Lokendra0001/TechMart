const { Router } = require("express");
const router = Router();
const { getStorage } = require("../config/cloudinary-config");
const multer = require("multer");
const { handleCreateProduct, handleGetAllProducts, handleGetProduct } = require("../controllers/product");

const storage = getStorage('productImages');
const upload = multer({ storage });


router.post("/create-product", upload.array('productImg', 5), handleCreateProduct);
router.get('/:id', handleGetProduct)
router.get('/', handleGetAllProducts)




module.exports = router;