const { Router } = require('express')
const router = Router();
const { handlePrePendingOrder, handleOrderConfirmed, handleGetAllOrders } = require("../controllers/orders");

router.post("/save-pending-order", handlePrePendingOrder);
router.patch("/order-confirmed", handleOrderConfirmed);
router.get("/getOrders", handleGetAllOrders);



module.exports = router;