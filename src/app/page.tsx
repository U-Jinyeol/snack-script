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
import { DEFAULT } from "@/constant";
import isLogin from "@/utils/isLogin";
import { useRouter } from "next/navigation";
import { showWarningAlert } from "@/utils/alert";

const Main = () => {
  const router = useRouter();
  const [orderList, setOrderList] = useState<GetSnackOrderListResponseData[]>(
    []
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getSnackOrderList = async () => {
    const result = await _getSnackOrderList({
      page: currentPage,
      size: DEFAULT.PAGING.size,
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
    if (!isLogin()) {
      setIsLoggedIn(false);
      showWarningAlert({ text: "로그인이 필요합니다." });
      router.push("/login");
    } else {
      setIsLoggedIn(true);
      getSnackOrderList();
    }
  }, [currentPage]);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <div>
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
          size={DEFAULT.PAGING.size}
          length={totalCount}
          visible={10}
          onPageChange={(selectPage) => handlePageChange(selectPage)}
        />
      </div>
    </div>
  );
};

export default Main;
