import Section from "@/components/Common/Section";
import SnackScriptAnimation from "./SnackScriptAnimation.tsx";

const Banner = () => {
  const sectionTitle = "//Banner";
  return (
    <Section title={sectionTitle}>
      <SnackScriptAnimation />
    </Section>
  );
};

export default Banner;
