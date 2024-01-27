import React from "react";
import Head from "next/head";
import MainBanner from "@/components/Main/Banner";
import MainPopular from "@/components/Main/Popular";
import MainOrderForm from "@/components/Main/OrderForm";
import MainOrderList from "@/components/Main/OrderList";

const Main = () => {
  return (
    <>
      <Head>
        <title>Snack Script</title>
        <meta name="description" content="Snack Ordering" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainBanner />
      <MainPopular />
      <MainOrderForm />
      <MainOrderList />
    </>
  );
};

export default Main;
