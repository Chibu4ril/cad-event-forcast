import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface PredictionChartProps {
  futurePredictions: number[];
}

const PredictionChart: React.FC<PredictionChartProps> = ({
  futurePredictions,
}) => {
  const [predictions, setPredictions] = useState<number[]>([]);

  // Generate week labels dynamically
  const labels = Array.from(
    { length: futurePredictions.length },
    (_, i) => `Week ${i + 1}`
  );

  // Chart.js Data
  const data = {
    labels,
    datasets: [
      {
        label: "Future Predictions",
        data: predictions.length ? predictions : futurePredictions,
        borderColor: "red",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Chart.js Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    fetch("https://cad-backend-lcaa.onrender.com/api/runPrediction")
      .then((res) => res.json())
      .then((data) => setPredictions(data.future_predictions))
      .catch((err) => console.error("Error fetching predictions:", err));
  }, []);

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PredictionChart;
