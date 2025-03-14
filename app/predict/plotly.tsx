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

const LogisticsGrowthChart = ({ jsonData }: { jsonData: any }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    console.log("Deset", jsonData);
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

  const generateColor = (index: number, total: number) => {
    const hue = (index * 360) / total; // Evenly distribute hues
    return `hsl(${hue}, 70%, 50%)`; // Keep 70% saturation and 50% lightness for vibrancy
  };

  const generateTraces = () => {
    return Object.keys(jsonData).map((key, index) => {
      const data = jsonData[key]; // Extract dynamic key's data

      const truncatedWeeks = data.weeks; // Limit to 100 points for performance
      const truncatedRegistrations = data.registrations;

      return {
        x: truncatedWeeks,
        y: truncatedRegistrations,
        mode: "lines+markers",
        name: key, // Use filename as legend
        line: {
          color: `hsl(${(index * 50) % 360}, 70%, 50%)`, // Dynamic color
        },
        marker: {
          size: 8,
        },
      };
    });
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
      data={generateTraces()} // Use the function to generate all traces
      layout={layout}
      config={config}
    />
  );
};

export default LogisticsGrowthChart;
