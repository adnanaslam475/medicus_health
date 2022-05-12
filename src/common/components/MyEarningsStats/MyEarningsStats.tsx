type Props = {
  label: string | number | undefined;
  text: string | number | undefined;
};

function MyEarningsStats(props: Props) {
  const { label, text } = props || {};
  return (
    <div className="mr-11">
      <p className="text-lg font-medium pb-0 mb-0">{text}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default MyEarningsStats;
