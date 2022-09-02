type Props = {
  label: string | number | undefined;
  text: string | number | undefined;
};

function MyEarningsStats(props: Props) {
  const { label, text } = props || {};
  return (
    <div className="md:min-w-[120px] w-[125px] md:w-[150px] lg:w-[140px]">
      <p className="text-lg font-medium pb-0 mb-0">{text}</p>
      <p className="text-sm whitespace-normal max-w-[150px]">{label}</p>
    </div>
  );
}

export default MyEarningsStats;
