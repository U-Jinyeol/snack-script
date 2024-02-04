import snackOrderRepository from "../repositories/snack.repository.js";
import SnackOrder from "../models/snack-order.model.js";
import { v4 as uuidv4 } from "uuid";
import authRepository from "../repositories/auth.repository.js";

export const orderStatus = {
  OrderChecking: 1, // 주문 확인중
  PaymentCompleted: 2, // 주문 완료
  OrderCancelled: 3, // 주문 취소
};

const createSnackOrder = async (snackName, orderUrl, email) => {
  try {
    const currentDate = new Date();
    const koreanDate = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);
    const formattedDate = koreanDate.toISOString();

    const newSnackOrder = new SnackOrder({
      created_at: formattedDate,
      updated_at: formattedDate,
      order_url: orderUrl,
      orderer: email.split("@")[0] ?? "-",
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

const updateOrderStatus = async (order_id, status, updated_memo, email) => {
  const user = await authRepository.getUserByUsername(email);

  if (user.level !== "ADMIN") {
    throw new Error("관리자만 주문 상태를 변경할 수 있습니다.");
  }

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
