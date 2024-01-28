"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import MainOrderForm from "@/components/Main/OrderForm";
import MainOrderList from "@/components/Main/OrderList";
import MainBanner from "@/components/Main/Banner";
import { _getSnackOrderList, _orderSnack } from "@/apis/snack";
import {
  GetSnackOrderListResponseData,
  OrderSnackRequestBody,
} from "@/apis/snack/type";
import Pagination from "@/components/Common/Pagination";
import { CONSTANT } from "@/constant";

const Main = () => {
  const [orderList, setOrderList] = useState<GetSnackOrderListResponseData[]>(
    []
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getSnackOrderList = async () => {
    const result = await _getSnackOrderList({
      page: currentPage,
      size: CONSTANT.defaultSize,
    });
    setOrderList(result?.data.snackOrderList);
    setTotalCount(result?.data.totalCount);
  };

  const handlePageChange = async (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleSubmit = async (orderSnackBody: OrderSnackRequestBody) => {
    await _orderSnack(orderSnackBody);
    getSnackOrderList();
  };

  useEffect(() => {
    getSnackOrderList();
  }, [currentPage]);
  return (
    <>
      <Head>
        <title>Snack Script</title>
        <meta
          name="description"
          content="짠짠 / 달달 / 매콤 / 쫀득 모두의 간식 주문"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-y-20px">
        <MainBanner />
        <MainOrderForm onSubmit={handleSubmit} />
        <MainOrderList getOrderList={getSnackOrderList} orderList={orderList} />
        <Pagination
          currentPage={currentPage}
          size={CONSTANT.defaultSize}
          length={totalCount}
          visible={10}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Main;
