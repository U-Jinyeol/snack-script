import React from "react";
import Section from "../Common/Section";

const Popular = () => {
  const sectionTitle = "이 달의 인기 간식";

  return (
    <React.Fragment>
      <Section title={sectionTitle}>
        <div>인기간식</div>
      </Section>
    </React.Fragment>
  );
};

export default Popular;
