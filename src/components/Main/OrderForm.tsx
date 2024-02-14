"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Section from "../Common/Section";
import { _getSnackOrderThumbnail, _orderSnack } from "@/apis/snack";
import Input from "../Common/Input";
import { showWarningAlert } from "@/utils/alert";
import { OrderSnackRequestBody, SnackOrderOgTag } from "@/apis/snack/type";
import MacbookAnimation from "../Common/MacbookAnimation";
import CommonButton from "../Common/Button";
import { DEFAULT } from "@/constant";
import EmptyImage from "../Common/EmptyImage";

type MainProps = {
  onSubmit: (orderSnackBody: OrderSnackRequestBody) => void;
};

const OrderForm = ({ onSubmit }: MainProps) => {
  const [snackName, setSnackName] = useState<string>("");
  const [orderUrl, setOrderUrl] = useState<string>("");
  const [isOgInfo, setIsOgInfo] = useState<boolean>(false);
  const [ogInfo, setOgInfo] = useState<SnackOrderOgTag>({
    title: "",
    image: "",
    description: "",
    url: "",
  });

  const sectionTitle: string = "//Order Form";

  const handleSnackLinkChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const link: string = event.target.value;
    setOrderUrl(link);

    if (!link.trim() || !link.includes(DEFAULT.SITE_NAME.HTTPS)) {
      setIsOgInfo(false);
      return;
    }

    getSnackOrderThumbnail(link);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!snackName.trim() || !orderUrl.trim()) {
      return showWarningAlert({ text: "빈칸을 채워주세요" });
    }

    if (!isOgInfo) {
      return showWarningAlert({ text: "올바른 구매 링크를 넣어주세요" });
    }

    const orderSnackBody = {
      snackName,
      orderUrl,
    };

    onSubmit(orderSnackBody);
    setSnackName("");
    setOrderUrl("");
    setIsOgInfo(false);
  };

  const getSnackOrderThumbnail = async (url: string) => {
    const result = await _getSnackOrderThumbnail(url);
    if (result?.success) {
      setIsOgInfo(result.success);
      setOgInfo(result.data);
    } else {
      setIsOgInfo(false);
    }
  };

  const imageErrorHandler = (event: any) => {
    event.target.src = DEFAULT.IMAGE.EMPTY;
  };

  return (
    <Section title={sectionTitle}>
      <MacbookAnimation />
      <form
        onSubmit={handleSubmit}
        className="text-green-300 flex flex-col gap-y-4"
      >
        <div className="max-w-600px">
          <Input
            placeholder="품명 및 수량을 입력해주세요."
            label="Snack Name"
            id="snackName"
            maxLength={60}
            value={snackName}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setSnackName(event.target.value)
            }
          />
          <p className="text-gray-600 text-sm mt-2">
            예시)오리온 예감 치즈그라탕 204gx2개 + 볶음양파맛 204g x 2개 [총4개]
          </p>
        </div>

        <div className="max-w-600px">
          <Input
            label="Snack Link"
            placeholder="지마켓 먼저 확인! 지마켓에 없을 경우 다른 사이트 이용!"
            id="snackLink"
            maxLength={500}
            value={orderUrl}
            onChange={handleSnackLinkChange}
          />
          <div className="mt-4px">
            <a
              href="https://www.gmarket.co.kr/n/smiledelivery"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-sm"
            >
              지마켓 스마일배송으로 이동
            </a>
          </div>

          <div className="w-full border border-gray-600 mt-4 p-2">
            {isOgInfo ? (
              <a
                href={ogInfo?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-4"
                onClick={(e) => {
                  if (!isOgInfo) {
                    e.preventDefault();
                  }
                }}
              >
                <img
                  src={ogInfo.image ?? DEFAULT.IMAGE.EMPTY}
                  alt="snack-order-thumbnail"
                  className="w-32 h-32 object-cover"
                  onError={imageErrorHandler}
                />
                <div>
                  <p className="text-lg font-bold">{ogInfo.title}</p>
                  <p className="text-gray-600">{ogInfo.description}</p>
                </div>
              </a>
            ) : (
              <div className="w-full flex items-center gap-4">
                <div className="w-32 h-32 object-cover">
                  <EmptyImage />
                </div>
                <p>What's your Snack?</p>
              </div>
            )}
          </div>
        </div>

        <CommonButton type="submit" label="Submit" className="max-w-260px" />
      </form>
    </Section>
  );
};

export default OrderForm;
