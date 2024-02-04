import client, { HttpResponse } from "@/utils/httpClient";
import {
  GetSnackOrderListRequestQuery,
  GetSnackOrderListResponse,
  OrderSnackRequestBody,
  UpdateSnackOrderStatusBody,
} from "./type";
import { showSuccessAlert, showErrorAlert } from "@/utils/alert";

export const _orderSnack = async (
  orderSnackRequestBody: OrderSnackRequestBody
): Promise<HttpResponse | null> => {
  try {
    const response = await client.post("/snack/order", orderSnackRequestBody);
    showSuccessAlert();
    return response;
  } catch (error: any) {
    showErrorAlert({ text: error.message });
    return null;
  }
};

export const _getSnackOrderList = async (
  getSnackOrderListRequestQuery: GetSnackOrderListRequestQuery
): Promise<GetSnackOrderListResponse | null> => {
  try {
    const response = await client.get(
      "/snack/order/list",
      getSnackOrderListRequestQuery
    );
    return response;
  } catch (error) {
    showErrorAlert({ text: "주문 리스트 불러오기 실패" });
    return null;
  }
};

export const _updateSnackOrderStatus = async (
  updateSnackOrderStatusBody: UpdateSnackOrderStatusBody
): Promise<HttpResponse | null> => {
  try {
    const response = await client.put(
      "/snack/order/status",
      updateSnackOrderStatusBody
    );
    showSuccessAlert({ text: "상태 변경에 성공하셨습니다." });
    return response;
  } catch (error: any) {
    showErrorAlert({ text: error.message });
    return null;
  }
};
