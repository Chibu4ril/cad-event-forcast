// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";

// Chart.register(...registerables); // Register Chart.js components

// interface PredictionChartProps {
//   futurePredictions: number[];
// }

// const PredictionChart: React.FC<PredictionChartProps> = ({
//   futurePredictions,
// }) => {
//   const labels = futurePredictions.map((_, i) => `Week ${i + 1}`);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Future Predictions",
//         data: futurePredictions,
//         borderColor: "red",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderWidth: 2,
//         fill: true,
//         tension: 0.4, // Smooth curves
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: true, position: "top" },
//     },
//     scales: {
//       x: { title: { display: true, text: "Weeks" } },
//       y: { title: { display: true, text: "Predictions" } },
//     },
//   };

//   return (
//     <div style={{ width: "600px", height: "400px", margin: "auto" }}>
//       <h2>Prediction Chart</h2>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default PredictionChart;
