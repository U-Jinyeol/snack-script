import snackOrderRepository from "../repositories/snack.repository.js";
import SnackOrder from "../models/snack-order.model.js";

export const orderStatus = {
  CONFIRMING: 1, // 주문 확인중
  COMPLETED: 2, // 주문 완료
  ARRIVED: 3, // 도착완료
  CANCELED: 4, // 주문 취소
};

let orderCounter = 1;

const createSnackOrder = async (snackName, orderUrl, orderer) => {
  try {
    const currentDate = new Date();
    const koreanDate = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);
    const formattedDate = koreanDate.toISOString();

    const newSnackOrder = new SnackOrder({
      no: orderCounter++,
      created_at: formattedDate,
      updated_at: formattedDate,
      order_url: orderUrl,
      orderer: orderer,
      status: orderStatus.CONFIRMING,
      order_id: `s-${Math.floor(Math.random() * 1000)}`,
      snack_name: snackName,
      order_url: orderUrl,
    });

    return await snackOrderRepository.createSnackOrder(newSnackOrder);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSnackOrderList = async (
  page,
  size,
  startAt,
  endAt,
  orderer,
  status
) => {
  try {
    let getSnackOrderListQuery = {};

    if (startAt && endAt) {
      const startAtISODate = new Date(startAt).toISOString();
      const endAtISODate = new Date(endAt);
      endAtISODate.setHours(23, 59, 59, 999);

      getSnackOrderListQuery.created_at = {
        $gte: startAtISODate,
        $lte: endAtISODate.toISOString(),
      };
    }

    if (orderer) {
      getSnackOrderListQuery.orderer = orderer;
    }

    if (status) {
      getSnackOrderListQuery.status = status;
    }

    return await snackOrderRepository.getSnackOrderList(
      page,
      size,
      getSnackOrderListQuery
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrderStatus = async (order_id, status) => {
  try {
    await snackOrderRepository.updateOrderStatus(order_id, status);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { createSnackOrder, getSnackOrderList, updateOrderStatus };
