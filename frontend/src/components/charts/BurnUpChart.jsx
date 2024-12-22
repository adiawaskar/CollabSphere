import React, { useState, useEffect } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BurnUpChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const numWeeks = 12;
    const labels = Array.from({ length: numWeeks }, (_, i) => `Week ${i + 1}`);
    const totalScope = 200; // Example total scope
    const scope = Array(numWeeks).fill(totalScope);

    // Generate completed work with some variation
    const completedWork = [];
    let cumulativeWork = 0;
    const idealIncrement = totalScope / numWeeks;

    for (let i = 0; i < numWeeks; i++) {
      let variation = (Math.random() - 0.5) * (idealIncrement * 0.4); // Variation up to 40% of ideal increment
      cumulativeWork += idealIncrement + variation;
      completedWork.push(Math.max(0, Math.min(cumulativeWork, totalScope))); // Ensure it doesn't go below 0 or above total scope
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "Total Scope",
          data: scope,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
        },
        {
          label: "Completed Work",
          data: completedWork,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Burn-Up Chart",
        font: {
          size: 16,
        },
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Weeks)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Story Points / Work Units",
        },
        beginAtZero: true,
        max: 220, // Set a max value for the y-axis (slightly higher than the total scope)
      },
    },
  };

  return (
    <div style={{ height: "750px", width: "100%" }}>
      {Object.keys(chartData).length > 0 && (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default BurnUpChart;