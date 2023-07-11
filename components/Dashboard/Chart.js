import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const data = {
  labels: ["Red", "Blue", "Leaves", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [32, 39, 10, 35, 32, 34],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  scales: {
    r: {
      ticks: {
        display: false, // Remove vertical numbers
      },
      grid: {
        display: false, // Removes the circulair lines
      },
    },
  },
};

export default function Chart() {
  return <div style={{ height: '350px', width: '350px' }}><PolarArea data={data} options={options} /></div>
}
