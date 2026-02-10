const MetricCard = ({
  title,
  value,
  icon,
  bg,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bg: string;
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
      </div>

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${bg}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;
