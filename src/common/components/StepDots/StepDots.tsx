import { Steps } from "antd";

type Props = {
  current: number;
};

function StepDots({ current }: Props) {
  return (
    <Steps current={current}>
      <Steps.Step />
      <Steps.Step />
      <Steps.Step />
      <Steps.Step />
    </Steps>
  );
}

export default StepDots;
