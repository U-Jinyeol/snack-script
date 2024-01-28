import snackOrderRepository from "../repositories/snack.repository.js";
import SnackOrder from "../models/snack-order.model.js";
import { v4 as uuidv4 } from "uuid";

export const orderStatus = {
  OrderChecking: 1, // 주문 확인중
  PaymentCompleted: 2, // 주문 완료
  OrderCancelled: 3, // 주문 취소
};

const createSnackOrder = async (snackName, orderUrl) => {
  try {
    const currentDate = new Date();
    const koreanDate = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);
    const formattedDate = koreanDate.toISOString();

    const newSnackOrder = new SnackOrder({
      created_at: formattedDate,
      updated_at: formattedDate,
      order_url: orderUrl,
      orderer: "TBD",
      status: orderStatus.OrderChecking,
      order_id: uuidv4(),
      snack_name: snackName,
      order_url: orderUrl,
      updated_memo: null,
    });

    return await snackOrderRepository.createSnackOrder(newSnackOrder);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSnackOrderList = async (page, size, startAt, endAt, status) => {
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

const updateOrderStatus = async (order_id, status, updated_memo) => {
  const currentDate = new Date();
  const koreanDate = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);
  const formattedDate = koreanDate.toISOString();

  let updateQuery = {
    status,
    updated_at: formattedDate,
  };

  if (updated_memo) {
    updateQuery.updated_memo = updated_memo;
  }

  try {
    await snackOrderRepository.updateOrderStatus(order_id, updateQuery);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { createSnackOrder, getSnackOrderList, updateOrderStatus };
