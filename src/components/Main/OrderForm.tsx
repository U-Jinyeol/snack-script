import React from "react";
import Section from "../Common/Section";

const OrderForm = () => {
  const sectionTitle = "주문 하기";

  return (
    <React.Fragment>
      <div className="bg-gray-200">
        <Section title={sectionTitle}>
          <div>주문 하기</div>
        </Section>
      </div>
    </React.Fragment>
  );
};

export default OrderForm;
