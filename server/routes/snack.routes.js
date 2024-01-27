import express from "express";
import snackOrderController from "../controller/snack.controller.js";

const router = express.Router();

router.post("/order", snackOrderController.createSnackOrder);
router.get("/order/list", snackOrderController.getSnackOrderList);
router.put("/order/status", snackOrderController.updateOrderStatus);

export default router;
