import snackOrderService from "../services/snack.service.js";

const createSnackOrder = async (req, res, next) => {
  try {
    const { snackName, orderUrl, orderer } = req.body;
    const newSnackOrder = await snackOrderService.createSnackOrder(
      snackName,
      orderUrl,
      orderer
    );
    res.status(201).json({
      success: true,
      message: "Snack order created successfully",
      data: newSnackOrder,
    });
  } catch (error) {
    next(error);
  }
};

const getSnackOrderList = async (req, res, next) => {
  try {
    const { page, size, startAt, endAt, orderer, status } = req.query;
    const snackOrderList = await snackOrderService.getSnackOrderList(
      page,
      size,
      startAt,
      endAt,
      orderer,
      status
    );
    res.status(200).json({
      success: true,
      message: "Snack order list fetched successfully",
      data: snackOrderList,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { order_id, status } = req.body;
    await snackOrderService.updateOrderStatus(order_id, status);
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    next(error);
  }
};

export default { createSnackOrder, getSnackOrderList, updateOrderStatus };
