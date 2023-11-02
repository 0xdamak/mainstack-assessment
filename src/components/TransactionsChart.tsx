import { type ITransaction } from "../models/transaction";
import { type ChartData } from "chart.js";
import { formatToUSD } from "../helpers/formatToUSD";
import { BaseButton } from "./UI/Buttons";
import { LineChart } from "./UI/Charts";
import dayjs from "dayjs";

interface Props {
  transactions: ITransaction[] | null;
}

export default function TransactionsChart({
  transactions,
}: Props): JSX.Element {
  const chartData = {
    labels: transactions?.map((transaction) =>
      dayjs(transaction.date).format("MMM-DD"),
    ),
    datasets: [
      {
        id: 1,
        label: "Days",
        data: transactions?.map((transaction) => transaction.amount),
        backgroundColor: ["#FF5403"],
        borderColor: ["#FF5403"],
        borderWidth: 1,
      },
    ],
  };

  if (transactions === null) return <></>;

  return (
    <div className="w-full">
      <div className="mb-8 flex items-end">
        <div>
          <p className="text-sm text-gray-400">Available Balance</p>
          <h1 className="text-2xl font-bold sm:text-2.5xl">
            {formatToUSD(125000)}
          </h1>
        </div>
        <BaseButton
          text="Withdraw"
          color="secondary"
          className="ml-auto sm:ml-16"
        />
      </div>
      <div className="w-full [&>canvas]:mx-auto [&>canvas]:md:mx-0">
        <LineChart
          datasetIdKey="daily-sales"
          data={chartData as ChartData<"line">}
          options={{
            plugins: {
              tooltip: {
                usePointStyle: true,
                boxWidth: 5,
                callbacks: {
                  label: function (context) {
                    const label = formatToUSD(context.parsed.y);
                    console.log(context.parsed.y);
                    return label;
                  },
                },
              },
              legend: {
                display: false,
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                  padding: 15,
                  boxWidth: 0,
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: function (value) {
                    console.log(value);
                    return formatToUSD(+value);
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
