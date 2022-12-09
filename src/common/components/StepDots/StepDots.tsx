import { Steps } from "antd";

type Props = {
  current: number;
};

function StepDots({ current }: Props) {
  return (
    <Steps current={current}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Steps.Step key={index} />
      ))}
    </Steps>
  );
}

export default StepDots;
