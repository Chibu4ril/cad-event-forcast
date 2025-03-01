import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PlotlyChart = dynamic(() => import("react-plotly.js"), { ssr: false });

interface LogisticGrowthData {
  x: number[]; // Array of values representing the x-axis
  y: number[]; // Array of actual data points corresponding to y
  futureWeeks: number[]; // Array of future week numbers
  futurePredictions: number[]; // Array of future predicted values
  parameters: {
    K: number; // Carrying capacity
    N0: number; // Initial population or initial value
    r: number; // Growth rate
  };
  weeks: string[]; // Array of strings representing weeks (e.g., 'Week 1', 'Week 2', ...)
  metadata: {
    final_predicted_registrations: number; // Final predicted registrations
    prediction_accuracy_percent: number; // Prediction accuracy percentage
    weeks_until_event: number; // Weeks until the event
    initial_growth_rate_r: number; // Initial growth rate (before any adjustments)
    adjusted_growth_rate_r: number; // Adjusted growth rate (after optimization)
  };
  logistic_growth_values: number[]; // Array of logistic growth values based on the logistic model
}

const LogisticsGrowthChart = ({
  jsonData,
}: {
  jsonData: LogisticGrowthData;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Logistic Growth function
  const logisticGrowth = (
    t: number,
    K: number,
    N0: number,
    r: number
  ): number => {
    return K / (1 + ((K - N0) / N0) * Math.exp(-r * t));
  };

  // Actual Data
  const actualData = {
    x: jsonData.x,
    y: jsonData.y,
    mode: "markers",
    name: "Actual Data",
    marker: { color: "blue" },
  };

  // Logistic Growth Curve (Fit Line)
  const logisticCurveX = jsonData.x;

  const logisticCurveY = logisticCurveX.map((t) =>
    logisticGrowth(
      t,
      jsonData.parameters.K,
      jsonData.parameters.N0,
      jsonData.parameters.r
    )
  );

  const logisticCurve = {
    x: logisticCurveX,
    y: logisticCurveY,
    mode: "lines",
    name: "Fitted Logistic Curve",
    line: { color: "green" },
  };

  // Future Predictions
  const futurePredictions = {
    x: jsonData.futureWeeks,
    y: jsonData.futurePredictions,
    mode: "lines+markers",
    name: "Future Predictions",
    line: { dash: "dash", color: "red" },
    marker: { color: "red", symbol: "x" },
  };

  // Layout settings
  const layout: Partial<Plotly.Layout> = {
    title: { text: "Logistic Growth Model for Cumulative Registrations" },
    xaxis: { title: { text: "Week" } },
    yaxis: { title: { text: "Cumulative Registrations" } },
    legend: {
      orientation: "v",
      y: 1,
      x: 0.05,
      xanchor: "auto",
      yanchor: "top",
      font: { size: 10 },
    },
    height: 600,
  };

  const config = {
    modeBarPosition: "right",
    responsive: true,
  };

  if (!isClient) return <p>Loading chart...</p>;

  return (
    <PlotlyChart
      data={[actualData, logisticCurve, futurePredictions]}
      layout={layout}
      config={config}
    />
  );
};

export default LogisticsGrowthChart;
