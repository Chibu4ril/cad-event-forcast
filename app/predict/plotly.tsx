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

  // Generate traces for each dataset
  // const generateTraces = () => {
  //   const traces = jsonData.map((jsonData: any, index: any) => {
  //     const keys = Object.keys(jsonData);
  //     const total = keys.length;

  //     return keys.map((key, index) => ({
  //       x: jsonData[key].weeks,
  //       y: jsonData[key].registrations,
  //       mode: "lines+markers",
  //       name: key, // Use dynamic file name in legend
  //       line: {
  //         color: generateColor(index, total), // Apply dynamic color
  //       },
  //       marker: {
  //         color: generateColor(index, total), // Use same color for markers
  //       },
  //     }));

  //     // Actual Data
  //     const actualData = {
  //       x: jsonData.x,
  //       y: jsonData.y,
  //       mode: "markers",
  //       name: `Actual Data File ${index + 1}`,
  //       marker: {
  //         color: `rgb(${(index * 50) % 255}, ${(index * 100) % 255}, ${
  //           (index * 150) % 255
  //         })`,
  //       }, // Unique color
  //     };

  //     // Logistic Growth Curve (Fit Line)
  //     const logisticCurveX = jsonData.x;
  //     const logisticCurveY = logisticCurveX.map((t) =>
  //       logisticGrowth(
  //         t,
  //         jsonData.parameters.K,
  //         jsonData.parameters.N0,
  //         jsonData.parameters.r
  //       )
  //     );
  //     const logisticCurve = {
  //       x: logisticCurveX,
  //       y: logisticCurveY,
  //       mode: "lines",
  //       name: `Fitted Logistic Curve File ${index + 1}`,
  //       line: {
  //         color: `rgb(${(index * 50) % 255}, ${(index * 100) % 255}, ${
  //           (index * 150) % 255
  //         })`,
  //       },
  //     };

  //     // Future Predictions
  //     const futurePredictions = {
  //       x: jsonData.futureWeeks,
  //       y: jsonData.futurePredictions,
  //       mode: "lines+markers",
  //       name: `Future Predictions File ${index + 1}`,
  //       line: {
  //         dash: "dash",
  //         color: `rgb(${(index * 50) % 255}, ${(index * 100) % 255}, ${
  //           (index * 150) % 255
  //         })`,
  //       },
  //       marker: {
  //         color: `rgb(${(index * 50) % 255}, ${(index * 100) % 255}, ${
  //           (index * 150) % 255
  //         })`,
  //         symbol: "x",
  //       },
  //     };

  //     return [actualData, logisticCurve, futurePredictions]; // Return the traces for this file
  //   });

  //   // Flatten the array of traces and return
  //   return traces.flat();
  // };
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
