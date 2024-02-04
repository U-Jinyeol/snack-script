import snackOrderService from "../services/snack.service.js";

const createSnackOrder = async (req, res, next) => {
  try {
    const { snackName, orderUrl } = req.body;

    const { email } = res.locals.user;

    await snackOrderService.createSnackOrder(snackName, orderUrl, email);
    res.status(200).json({
      success: true,
      message: "SUCCESS",
      code: 0,
    });
  } catch (error) {
    next(error);
  }
};

const getSnackOrderList = async (req, res, next) => {
  try {
    const { page, size, startAt, endAt, status } = req.query;
    const snackOrderList = await snackOrderService.getSnackOrderList(
      page,
      size,
      startAt,
      endAt,
      status
    );
    res.status(200).json({
      success: true,
      message: "SUCCESS",
      data: snackOrderList,
      code: 0,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { order_id, status, updated_memo } = req.body;
    const { email } = res.locals.user;

    await snackOrderService.updateOrderStatus(
      order_id,
      status,
      updated_memo,
      email
    );
    res.status(200).json({
      success: true,
      message: "SUCCESS",
      code: 0,
    });
  } catch (error) {
    next(error);
  }
};

export default { createSnackOrder, getSnackOrderList, updateOrderStatus };
