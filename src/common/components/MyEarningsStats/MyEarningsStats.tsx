type Props = {
  label: string | number | undefined;
  text: string | number | undefined;
};

function MyEarningsStats(props: Props) {
  const { label, text } = props || {};
  return (
    <div className="min-w-[50px] w-[125px]">
      <p className="text-lg font-medium pb-0 mb-0">{text}</p>
      <p className="text-sm whitespace-normal">{label}</p>
    </div>
  );
}

export default MyEarningsStats;
