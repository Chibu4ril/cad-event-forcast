import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // Register Chart.js components

interface PredictionChartProps {
  futurePredictions: number[];
}

const PredictionChart: React.FC<PredictionChartProps> = ({
  futurePredictions,
}) => {
  const weeks = Array.from(
    { length: futurePredictions.length },
    (_, i) => `Week ${i + 1}`
  );

  const data = {
    labels: weeks,
    datasets: [
      {
        label: "Future Registrations",
        data: futurePredictions,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Predicted Growth for `,
        font: { size: 18 },
      },
    },
    scales: {
      x: { title: { display: true, text: "Week" } },
      y: { title: { display: true, text: "Predicted Registrations" } },
    },
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default PredictionChart;
