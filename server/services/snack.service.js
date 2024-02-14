import snackOrderRepository from "../repositories/snack.repository.js";
import SnackOrder from "../models/snack-order.model.js";
import { v4 as uuidv4 } from "uuid";
import authRepository from "../repositories/auth.repository.js";
import axios from "axios";
import cheerio from "cheerio";

export const orderStatus = {
  OrderChecking: 1, // 주문 확인중
  PaymentCompleted: 2, // 주문 완료
  OrderCancelled: 3, // 주문 취소
};

const createSnackOrder = async (snackName, orderUrl, email) => {
  try {
    const currentDate = new Date();
    // const koreanDate = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);
    const formattedDate = currentDate.toISOString();

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

const getSnackOrderThumbnail = async (productUrl) => {
  try {
    const html = await getHtml(productUrl);
    const $ = cheerio.load(html.data);

    const title = $("meta[property='og:title']").attr("content");
    const description = $("meta[property='og:description']").attr("content");
    const image = $("meta[property='og:image']").attr("content");
    const url = $("meta[property='og:url']").attr("content");

    const convertImageUrl = (image) => {
      if (image.startsWith("//")) {
        return `https:${image}`;
      }

      if (image.startsWith("https") || image.startsWith("http")) {
        return image;
      }

      return image;
    };

    return { title, description, image: convertImageUrl(image), url };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getHtml = async (url) => {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
  };

  try {
    return await axios.get(url, { headers });
  } catch (error) {
    console.error("error", error);
  }
};

export default {
  createSnackOrder,
  getSnackOrderList,
  updateOrderStatus,
  getSnackOrderThumbnail,
};
