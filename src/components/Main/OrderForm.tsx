"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Section from "../Common/Section";
import { _orderSnack } from "@/apis/snack";
import Input from "../Common/Input";
import { showWarningAlert } from "@/utils/alert";
import { OrderSnackRequestBody } from "@/apis/snack/type";
import MacbookAnimation from "../Common/MacbookAnimation";

type MainProps = {
  onSubmit: (orderSnackBody: OrderSnackRequestBody) => void;
};

const OrderForm = ({ onSubmit }: MainProps) => {
  const [snackName, setSnackName] = useState<string>("");
  const [orderUrl, setOrderUrl] = useState<string>("");

  const sectionTitle: string = "//Order Form";

  const handleSnackLinkChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const link: string = event.target.value;
    setOrderUrl(link);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!snackName.trim() || !orderUrl.trim()) {
      return showWarningAlert({ text: "빈칸을 채워주세요" });
    }

    const orderSnackBody = {
      snackName,
      orderUrl,
    };

    onSubmit(orderSnackBody);
    setSnackName("");
    setOrderUrl("");
  };

  return (
    <Section title={sectionTitle} backgroundColor="bg-black">
      <MacbookAnimation />

      <form
        onSubmit={handleSubmit}
        className="text-green-300 flex flex-col gap-y-4"
      >
        <div className="max-w-600px">
          <Input
            label="Snack Name"
            id="snackName"
            maxLength={60}
            value={snackName}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setSnackName(event.target.value)
            }
          />
        </div>

        <div className="max-w-600px">
          <Input
            label="Snack Link"
            id="snackLink"
            maxLength={500}
            value={orderUrl}
            onChange={handleSnackLinkChange}
          />
        </div>
        <button
          type="submit"
          className="max-w-260px bg-gray-500 text-white py-2 px-4 rounded hover:bg-green-300"
        >
          Submit
        </button>
      </form>
    </Section>
  );
};

export default OrderForm;
