import snackOrderService from "../services/snack.service.js";
import slackController from "./slack.controller.js";

const createSnackOrder = async (req, res, next) => {
  try {
    const { snackName, orderUrl } = req.body;

    const { email } = res.locals.user;

    await snackOrderService.createSnackOrder(snackName, orderUrl, email);

    slackController.sendMessageToSlack(
      email.split("@")[0] ?? email,
      `님이 *${snackName}* 을 주문했습니다. 주문 링크: ${orderUrl}`
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

const getSnackOrderThumbnail = async (req, res, next) => {
  try {
    const { url } = req.body;

    const thumbnail = await snackOrderService.getSnackOrderThumbnail(url);
    res.status(200).json({
      success: thumbnail ? true : false,
      message: "SUCCESS",
      data: thumbnail,
      code: 100009,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "FAIL",
      code: 100009,
    });
  }
};

export default {
  createSnackOrder,
  getSnackOrderList,
  updateOrderStatus,
  getSnackOrderThumbnail,
};
