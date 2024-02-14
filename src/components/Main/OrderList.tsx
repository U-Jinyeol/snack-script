import Section from "../Common/Section";
import { _getSnackOrderList, _updateSnackOrderStatus } from "@/apis/snack";
import { GetSnackOrderListResponseData, OrderStatus } from "@/apis/snack/type";
import { formatDate } from "@/utils/dateFormatter";
import { useState } from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";

type OrderListProps = {
  orderList: GetSnackOrderListResponseData[];
  getOrderList: () => void;
};

const OrderList = ({ orderList, getOrderList }: OrderListProps) => {
  const sectionTitle = "//Order List";

  const convertStatusText = (type: OrderStatus) => {
    let text = "";
    let color = "text-gray-500";
    switch (type) {
      case OrderStatus.OrderChecking:
        text = "Checking";
        break;
      case OrderStatus.PaymentCompleted:
        text = "Completed";
        color = "text-green-300";
        break;
      case OrderStatus.OrderCancelled:
        text = "Canceled";
        color = "text-red-500";
        break;
      default:
        text = "Checking";
        break;
    }
    return { text, color };
  };

  const updateStatus = async (orderId: string, status: number) => {
    const result = await _updateSnackOrderStatus({
      order_id: orderId,
      status,
      updated_memo: "",
    });

    if (result?.code === 0) {
      getOrderList();
    }
  };
  return (
    <Section title={sectionTitle}>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="text-14px leading-32px">
            <th>No</th>
            <th>주문일</th>
            <th>상품명</th>
            <th>구매 링크</th>
            <th>주문자</th>
            <th>주문 상태</th>
          </tr>
        </thead>
        <tbody>
          {orderList?.length > 0 ? (
            orderList.map((order, index) => (
              <tr key={order.order_id}>
                <td>{index + 1}</td>
                <td>{formatDate(order.created_at)}</td>
                <td>{order.snack_name}</td>
                <td className="text-left max-w-xs px-2 whitespace-nowrap truncate">
                  <a
                    href={order.order_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-800"
                  >
                    {order.order_url}
                  </a>
                </td>
                <td>{order.orderer}</td>
                <td>
                  <div className="flex items-center justify-center">
                    <div
                      className={`p-1 ${convertStatusText(order.status).color}`}
                    >
                      {convertStatusText(order.status).text}
                    </div>
                    {order.status === OrderStatus.OrderChecking && (
                      <div className="flex gap-1">
                        <MdCancel
                          onClick={() => {
                            updateStatus(
                              order.order_id,
                              OrderStatus.OrderCancelled
                            );
                          }}
                          color="red"
                          size={20}
                          className="cursor-pointer hover:opacity-75"
                        />
                        <MdCheckCircle
                          onClick={() => {
                            updateStatus(
                              order.order_id,
                              OrderStatus.PaymentCompleted
                            );
                          }}
                          color="green"
                          size={20}
                          className="cursor-pointer hover:opacity-75"
                        />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4" colSpan={6}>
                주문 내역이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Section>
  );
};

export default OrderList;
