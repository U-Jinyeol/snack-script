import { useState } from "react";
import Section from "../Common/Section";
import { _getSnackOrderList } from "@/apis/snack";
import { GetSnackOrderListResponseData, OrderStatus } from "@/apis/snack/type";
import { formatDate } from "@/utils/dateFormatter";

type OrderListProps = {
  orderList: GetSnackOrderListResponseData[];
};

const OrderList = ({ orderList }: OrderListProps) => {
  const sectionTitle = "//Order List";

  const convertStatusText = (type: OrderStatus) => {
    let text = "";
    let color = "";
    switch (type) {
      case OrderStatus.OrderChecking:
        text = "Checking";
        color = "bg-yellow-400";
        break;
      case OrderStatus.PaymentCompleted:
        text = "Payment";
        color = "bg-blue-800";
        break;
      case OrderStatus.ArrivalCompleted:
        text = "Arrival";
        color = "bg-green-800";
        break;
      case OrderStatus.OrderCancelled:
        text = "Cancelled";
        color = "bg-red-600";
        break;

      default:
        text = "주문 확인중";
        break;
    }
    return { text, color };
  };

  return (
    <Section title={sectionTitle}>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="text-14px leading-32px">
            <th>No</th>
            <th>주문일</th>
            <th>상품명</th>
            <th>상품 URL</th>
            <th>주문자</th>
            <th>주문 상태</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order, index) => (
            <tr key={order.order_id}>
              <td>{index + 1}</td>
              <td>{formatDate(order.created_at)}</td>
              <td>{order.snack_name}</td>
              <td className=" max-w-xs whitespace-nowrap truncate">
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
                <div
                  className={`text-gray-900 p-1 rounded-md ${
                    convertStatusText(order.status).color
                  }`}
                >
                  {convertStatusText(order.status).text}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default OrderList;
