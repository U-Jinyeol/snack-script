import React from "react";
import Section from "../Common/Section";

const OrderList = () => {
  const sectionTitle = "주문 리스트";
  return (
    <React.Fragment>
      <div>
        <Section title={sectionTitle}>
          <div>주문 리스트</div>
        </Section>
      </div>
    </React.Fragment>
  );
};

export default OrderList;
