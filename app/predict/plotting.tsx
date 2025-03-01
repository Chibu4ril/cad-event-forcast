import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PredictionChart = ({
  weeks,
  futurePredictions,
}: {
  weeks: string[];
  futurePredictions: number[];
}) => {
  const chartData = {
    labels: weeks, // X-axis labels (Weeks)
    datasets: [
      {
        label: "Future Predictions",
        data: futurePredictions, // Y-axis data (Predictions)
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)", // Red color
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Transparent fill
        tension: 0.2, // Smoothness
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Future Predictions",
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default PredictionChart;
