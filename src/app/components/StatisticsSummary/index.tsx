import { StatisticsSummaryProps } from "./StatisticsSummaryProps";

export default function StatisticsSummary({ stats, onCardClick }: StatisticsSummaryProps) {
  console.log("stats en Dashboard", stats);

  return ( // Aquí aseguramos que el componente retorne JSX
    <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-md">
      {stats.map((stat) => {
        console.log("Stat:", stat);
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center bg-white p-4 rounded-md shadow-sm w-1/5 cursor-pointer"
            onClick={() => onCardClick(stat.label)}
          >
            <span>{stat.value}</span>
            <span>{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}
