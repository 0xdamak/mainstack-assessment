import {
  type ChartData,
  type ChartOptions,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

interface LineProps {
  datasetIdKey: string;
  options: ChartOptions<"line">;
  data: ChartData<"line">;
}

export function LineChart(props: LineProps): JSX.Element {
  Chart.register(
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  );
  return <Line {...props} />;
}
