const { Router } = require("express");
const multer = require('multer');
const { getStorage } = require("../config/cloudinary-config");
const { handleCreateUser, handleLoginUser, handleLogoutUser, handleGetCurrentUser, handleEditAvator, handleEditBio, handleUpdateQuantity, handleAddToCart, handleDeleteProduct, handleRemoveProductFromCart, handleGetCartProducts } = require("../controllers/user");
const checkAuthentication = require("../middlewares/auth");

const router = Router();
const storage = getStorage('userProfileImg')
const upload = multer({ storage });

//User Related Work
router.post('/signup', upload.single('profilePic'), handleCreateUser);
router.post('/signin', handleLoginUser)
router.post('/logout', handleLogoutUser);
router.get('/getUser', checkAuthentication, handleGetCurrentUser)
router.patch('/editBio', handleEditBio)
router.patch('/editAvator', upload.single('profilePic'), handleEditAvator)


//User Product Related Work
router.patch("/addToCart", handleAddToCart)
router.get("/getProducts", handleGetCartProducts)
router.patch("/updateQty", handleUpdateQuantity);
router.patch("/deleteProduct", handleDeleteProduct);
router.patch("/removeCart", handleRemoveProductFromCart)


module.exports = router;