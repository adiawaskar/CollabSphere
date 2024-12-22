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

const BurnDownChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const numWeeks = 12;
    const labels = Array.from({ length: numWeeks }, (_, i) => `Week ${i + 1}`);
    const totalScope = 200;

    const completedWork = [];
    let cumulativeWork = 0;
    const idealIncrement = totalScope / numWeeks;

    for (let i = 0; i < numWeeks; i++) {
      let variation = (Math.random() - 0.5) * (idealIncrement * 0.4);
      cumulativeWork += idealIncrement + variation;
      completedWork.push(Math.max(0, Math.min(cumulativeWork, totalScope)));
    }

    const remainingWork = completedWork.map((work) => totalScope - work);
    remainingWork.unshift(totalScope);

    // Calculate a more realistic ideal trend
    const idealTrend = [];
    let idealRemaining = totalScope;
    for (let i = 0; i <= numWeeks; i++) {
      idealTrend.push(idealRemaining);
      idealRemaining -= totalScope / numWeeks;
    }
    idealTrend[idealTrend.length - 1] = 0; // ensure it ends at 0

    setChartData({
      labels: ["Start", ...labels],
      datasets: [
        {
          label: "Remaining Work",
          data: remainingWork,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
        },
        {
          label: "Ideal Trend",
          data: idealTrend,
          borderColor: "gray",
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
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
        text: "Burn-Down Chart",
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
        max: 220,
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {Object.keys(chartData).length > 0 && (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default BurnDownChart;