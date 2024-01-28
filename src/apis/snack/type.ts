import { HttpResponse } from "@/utils/httpClient";

export type OrderSnackRequestBody = {
  snackName: string;
  orderUrl: string;
};

export type GetSnackOrderListRequestQuery = {
  page: number;
  size: number;
  startAt?: string;
  endAt?: string;
  status?: string;
};

export type GetSnackOrderListResponseData = {
  created_at: string;
  no: number;
  order_id: string;
  order_url: string;
  orderer: string;
  snack_name: string;
  status: number;
  updated_at: string;
  __v: number;
  _id: string;
};

export type GetSnackOrderListResponse = HttpResponse & {
  data?: { snackOrderList: GetSnackOrderListResponseData; totalCount: number };
};

export type UpdateSnackOrderStatusBody = {
  order_id: string;
  status: number;
  updated_memo?: string;
};

export enum OrderStatus {
  OrderChecking = 1, // 주문 확인중
  PaymentCompleted = 2, // 결제 완료
  OrderCancelled = 3, // 주문 취소
}
